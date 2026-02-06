import React, { useState, useEffect } from 'react';
import { Settings, Home, Brain, Grid, Loader2 } from 'lucide-react';
import MindscapeDeveloperModal from './MindscapeDeveloperModal';
import { Outlet } from 'react-router-dom';
import { siteConfig } from '@server/storage/siteConfig';
import { Link } from 'react-router-dom';

interface DBPage {
  id: number;
  headline: string;
  subtitle: string;
}

const NavigatorBar: React.FC = () => {
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbPages, setDbPages] = useState<DBPage[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/pages', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.pages) {
            setDbPages(data.pages);
          }
        }
      } catch (err) {
        console.error('Failed to fetch pages:', err);
      } finally {
        setLoadingPages(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="relative">
      {/* TopBar Component - positioned below layout-header */}
      <div className="fixed top-8 left-0 right-0 bg-black border-b border-gray-200/30 z-50">
        <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
          {/* Hamburger Menu Button - Left Side */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex flex-col gap-1.5 p-2 hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-gray-200"></div>
            <div className="w-6 h-0.5 bg-gray-200"></div>
            <div className="w-6 h-0.5 bg-gray-200"></div>
          </button>

          {/* Right Side - ALTHA.CRA Text, Profile and Settings */}
          <div className="flex items-center gap-3">
            {/* ALTHA.CRA Text */}
            <span className="text-gray-100 font-black text-lg">ALTHA.CRA</span>
            
            {/* Profile Image - dengan loading */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center relative">
              {profileLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <Loader2 className="animate-spin text-gray-400" size={16} />
                </div>
              )}
              <img 
                src={siteConfig.profile.profileImage} 
                alt="Profile" 
                className={`w-full h-full object-cover ${profileLoading ? 'invisible' : ''}`}
                onLoad={() => setProfileLoading(false)}
                onError={() => setProfileLoading(false)}
              />
            </div>
            
            {/* Developer Settings Button */}
            <button
              onClick={() => setDeveloperModalOpen(true)}
              className="flex items-center justify-center bg-gray-100 text-black px-2 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay - starts below TopBar */}
      {sidebarOpen && (
        <div
          className="fixed top-[calc(2rem+4rem)] left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - starts below TopBar */}
      <div
        className={`fixed top-[calc(2rem+4rem)] left-0 h-[calc(100vh-6rem)] w-80 bg-black border-r border-gray-200/30 text-gray-100 z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Content */}
        <nav className="p-6 pt-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200/10 transition-colors font-medium"
              >
                <Home size={20} />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200/10 transition-colors font-medium"
              >
                <Grid size={20} />
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/mindscape"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200/10 transition-colors font-medium"
              >
                <Brain size={20} />
                Mindscape
              </Link>
            </li>
            
            {/* Hardcoded Pages */}
            <li>
              <Link
                to="/mindscape/personal"
                onClick={() => setSidebarOpen(false)}
                className="block p-3 rounded-lg hover:bg-gray-200/10 transition-colors font-medium ml-4 text-sm text-gray-300"
              >
                Personal Journey & Thoughts
              </Link>
            </li>
            <li>
              <Link
                to="/mindscape/pre-fase"
                onClick={() => setSidebarOpen(false)}
                className="block p-3 rounded-lg hover:bg-gray-200/10 transition-colors font-medium ml-4 text-sm text-gray-300"
              >
                19 September 2025
              </Link>
            </li>

            {/* Database Pages - load independently, show when ready */}
            {dbPages.length > 0 && (
              <>
                <li className="pt-4 pb-2">
                  <span className="text-xs uppercase text-gray-500 font-bold px-3">Database Pages</span>
                </li>
                {dbPages.map((page) => (
                  <li key={page.id}>
                    <Link
                      to={`/mindscape/page/${page.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className="block p-3 rounded-lg hover:bg-gray-200/10 transition-colors font-medium ml-4 text-sm text-cyan-400"
                    >
                      {page.headline}
                    </Link>
                  </li>
                ))}
              </>
            )}

            {/* Show loading indicator only, don't block UI */}
            {loadingPages && dbPages.length === 0 && (
              <li className="pt-2">
                <span className="text-xs text-gray-500 px-3 flex items-center gap-2">
                  <Loader2 className="animate-spin" size={14} />
                  Loading pages...
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
      
      {/* Content with padding for TopBar and layout-header */}
      <div className="relative pt-24">
        <Outlet />
      </div>
      
      {/* Developer Mode Modal */}
      <MindscapeDeveloperModal
        isOpen={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />
    </div>
  );
};

export default NavigatorBar;
