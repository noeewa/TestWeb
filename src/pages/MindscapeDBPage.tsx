import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Section {
  title: string;
  content: string[];
}

interface MindscapePage {
  id: number;
  headline: string;
  subtitle: string;
  sections: Section[];
}

const MindscapeDBPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<MindscapePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchPage = async () => {
      console.log('[MindscapeDBPage] Fetching page ID:', id);
      console.log('[MindscapeDBPage] API URL: http://localhost:3000/api/pages/' + (parseInt(id || '1')));
      
      try {
        setLoading(true);
        const pageId = parseInt(id || '1');
        
        const res = await fetch(`http://localhost:3000/api/pages/${pageId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        console.log('[MindscapeDBPage] Response status:', res.status);
        console.log('[MindscapeDBPage] Response ok:', res.ok);
        
        if (res.ok) {
          const data = await res.json();
          console.log('[MindscapeDBPage] Response data:', data);
          
          if (data.success && data.page) {
            setPage(data.page);
            setError(null);
          } else {
            setError('Page not found in database');
            console.error('[MindscapeDBPage] Page not found or empty response');
          }
        } else {
          setError('Server error: HTTP ' + res.status);
          console.error('[MindscapeDBPage] HTTP Error:', res.status, res.statusText);
        }
      } catch (err) {
        console.error('[MindscapeDBPage] Fetch Error:', err);
        console.error('[MindscapeDBPage] Error name:', err?.name);
        console.error('[MindscapeDBPage] Error message:', err?.message);
        
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          setError('Connection failed - Server not running on port 3000');
          console.error('[MindscapeDBPage] Possible causes:');
          console.error('[MindscapeDBPage] 1. Server not running (run: node index.js)');
          console.error('[MindscapeDBPage] 2. Check if backend server is started');
        } else {
          setError('Connection error: ' + (err?.message || 'Unknown error'));
        }
      } finally {
        setLoading(false);
        console.log('[MindscapeDBPage] Fetch complete');
      }
    };

    if (id) {
      // Small delay to ensure server is ready
      const timeoutId = setTimeout(() => {
        fetchPage();
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100 -mt-24 flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-black text-gray-100 -mt-24 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-black mb-4">Page Not Found</h1>
        <p className="text-gray-300 mb-8">{error}</p>
        <Link 
          to="/mindscape"
          className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Navigator
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 -mt-24">
      {/* Header */}
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
              Database Page
            </span>
          </div>
          
          <h1 className="font-black mb-6">
            {page.headline}
          </h1>
          
          <p className="text-gray-300 max-w-2xl">
            {page.subtitle}
          </p>
        </div>
      </header>

      {/* Content Sections */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {page.sections.map((section, index) => (
            <section key={index} className="flex gap-8">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                {index < page.sections.length - 1 && (
                  <div className="w-[0.3px] h-full bg-gray-200/30 mt-2"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h2 className="text-3xl font-black mb-6">{section.title}</h2>
                <div className="rounded-[4px] border-solid border-[0.0px] border-white/30 overflow-hidden p-6">
                  <p className="text-[16px] leading-relaxed whitespace-pre-line">
                    {section.content.map((item, idx) => (
                      <span className='mb-4 block' key={idx}>{item}<br /></span>
                    ))}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Back to Navigator */}
      <section className="py-16 text-center border-t border-gray-800">
        <h2 className="font-black mb-4">Ready to explore more?</h2>
        <p className="text-gray-300 mb-8">
          Return to the mindscape navigator to explore other sections
        </p>
        <Link 
          to="/mindscape"
          className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Navigator
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-800">
        <p className="text-sm italic text-gray-400">
          Dynamic Content from Database
        </p>
      </footer>
    </div>
  );
};

export default MindscapeDBPage;
