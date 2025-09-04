import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Store scroll positions for different routes
const scrollPositions = new Map<string, number>();

export const useScrollPosition = () => {
  const location = useLocation();
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Save current scroll position when leaving the route
    const saveScrollPosition = () => {
      scrollPositions.set(location.pathname, scrollPositionRef.current);
    };

    // Restore scroll position when entering the route
    const restoreScrollPosition = () => {
      if (location.pathname === '/') {
        // For home page, restore saved position
        const savedPosition = scrollPositions.get(location.pathname) || 0;
        setTimeout(() => {
          window.scrollTo({ top: savedPosition, behavior: 'instant' });
        }, 0);
      } else {
        // For other pages, scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    // Save position before navigation
    return () => {
      saveScrollPosition();
    };
  }, [location.pathname]);

  useEffect(() => {
    // Restore position after component mount
    if (location.pathname === '/') {
      const savedPosition = scrollPositions.get(location.pathname) || 0;
      setTimeout(() => {
        window.scrollTo({ top: savedPosition, behavior: 'instant' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);
};