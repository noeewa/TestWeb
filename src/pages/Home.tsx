import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { siteConfig } from '@server/storage/siteConfig';
import ScrollingQuotes from '../components/ScrollingQuotes';
import WorkflowSlider from '../components/WorkflowSlider';
import TimelineSlider from '../components/TimelineSlider';
import { ArrowLeft, Instagram, Github, Mail, Linkedin, MapPin, Loader2 } from 'lucide-react';
import { Loader } from '@/components/Loading';

// Interface for page data from Neon DB
interface Page {
  id: number;
  headline: string;
  subtitle: string;
}

const Home: React.FC<{
    posisi: number; 
    setPosisi: React.Dispatch<React.SetStateAction<number>>;
  }> = ({posisi, setPosisi}) => {
  const { profile, about, contact, navigation } = siteConfig;
  let [onLoading, setLoading] = useState(true);
  
  // State for Neon DB data
  const [dbPages, setDbPages] = useState<Page[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  // Fetch pages from Neon DB
  useEffect(() => {
    // Use Vercel domain for production, localhost for development
    const API_URL = import.meta.env.PROD 
      ? 'https://althabase.vercel.app' 
      : 'http://localhost:3000';
    
    console.log('[Home] Environment:', import.meta.env.PROD ? 'Production' : 'Development');
    console.log('[Home] API URL:', API_URL + '/api/pages');
    
    const fetchPages = async () => {
      try {
        setDbLoading(true);
        console.log('[Home] Sending request to server...');
        
        const res = await fetch(API_URL + '/api/pages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        console.log('[Home] Response status:', res.status);
        console.log('[Home] Response ok:', res.ok);
        
        if (res.ok) {
          const data = await res.json();
          console.log('[Home] Response data:', data);
          
          if (data.success && data.pages) {
            setDbPages(data.pages);
            setDbError(null);
            console.log('[Home] Successfully loaded', data.pages.length, 'pages');
          } else {
            setDbError('Failed to fetch pages - API returned error');
            console.error('[Home] API error:', data);
          }
        } else {
          setDbError(`Server error: HTTP ${res.status}`);
          console.error('[Home] HTTP Error:', res.status, res.statusText);
        }
      } catch (err) {
        console.error('[Home] Fetch Error Details:', err);
        console.error('[Home] Error name:', err?.name);
        console.error('[Home] Error message:', err?.message);
        
        // Check for common issues
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          setDbError('Connection failed - Server may not be running on port 3000');
          console.error('[Home] Possible causes:');
          console.error('[Home] 1. Server is not running (start with: node index.js or npm run dev)');
          console.error('[Home] 2. CORS policy blocking the request');
          console.error('[Home] 3. Network/firewall issue');
          console.error('[Home] 4. Wrong API URL');
        } else {
          setDbError('Connection error: ' + (err?.message || 'Unknown error'));
        }
      } finally {
        setDbLoading(false);
        console.log('[Home] Fetch complete');
      }
    };

    // Small delay to ensure server is ready
    const timeoutId = setTimeout(() => {
      fetchPages();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);
  //Masih belum berfungsi karena loading hanya ditrigger oleh satu gambar yaitu bannerimage
  function loadingImage() {
    const imageload = Array.from(
      document.querySelectorAll<HTMLImageElement>('.toload img')
    )
    
    return Promise.all(
      imageload.map(img => 
        new Promise<void>(resolve => {
          if (img.complete && img.naturalWidth !== 0) {
            resolve();
          } else {
            img.addEventListener("load", () => resolve(), { once: true});
            img.addEventListener("error", () => resolve(), { once: true});
          }
        })
      )
    ).then(() => setLoading(false))
  }
  useEffect(() => {
    loadingImage()
  }, [])
  useLayoutEffect(() => {
    // Trigger onLoading when Home component mounts
    
    window.scrollTo({top: posisi, behavior: 'smooth'});
    return () => {
      if (posisi >= 0) {
        setPosisi(window.scrollY);
        console.log('Saving scroll position:', window.scrollY);
      } else {
        console.log('No scroll position to save');
        return;
      }
    };
  }, []);
  // navigate

  return (
    <div className="min-h-screen">
      {onLoading ? (<div className='wrapper'><Loader/></div>) : (<div></div>)}
      {/* Banner Section - Black Background */}
      <section className="bg-black text-white min-h-screen flex justify-center">
        <div 
          className=""
          onClick={() => {
            document.querySelector('#lobby-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          <div className="flex justify-center items-center w-full">
            <img src={siteConfig.profile.bannerImage} alt="Banner" className="w-3/4 h-auto banner-scale cursor-pointer toload" onLoad={() => setLoading(false)}/>
          </div>
          
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce cent">
          <div className="-translate-y-10 w-4 h-8 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Scrolling Quotes */}
      <ScrollingQuotes />

      {/* Lobby Section - White Background */}
      {/* Test Page */}
      {/* Header */}
      <section id="lobby-section" className='p-20'>
      {/* Profile Section */}
      <main className="px-6 pb-16 ">
        <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-col gap-12 items-start">
          {/*CONTAINER*/}
            <div className="w-[100%] flex flex-col justify-center items-start text-center">
              <div className='flex flex-col justify-center items-center text-center gap-2 mb-4'>
                <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
                    Available for new projects
                </span>
                <h1 className="font-black mb-6 text-center">
                  {profile.name}
                </h1>
              </div>
              <div className="w-60 h-60 rounded-full shadow-2xl shadow-neutral-700/60 overflow-hidden bg-gray-900 flex items-center justify-center hover:scale-110 transition-transform">
                <img src={siteConfig.profile.profileImage} alt="Image Profile" 
                className="w-full h-full object-cover toload" onLoad={() => setLoading(false)}/>
              </div>
            </div>
            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="font-black mb-4">{profile.role}</h2>
              <p className="text-gray-900 mb-8">{profile.description}</p>
              
              {/* Navigation Buttons */}
              <div className="flex gap-4 mb-8">
                <Link to="/mindscape" className="bg-white btn-brutal text-2xl flex align-middle items-center text-black px-4 py-2 font-bold hover:bg-gray-200 transition-colors">
                  Mindscape
                </Link>
                <Link to="/gallery" className="bg-white btn-brutal flex align-middle items-center text-black px-4 py-2 font-bold hover:bg-gray-200 transition-colors">
                  Gallery
                </Link>
                <a href="http://www.instagram.com/altha.cra" target="_blank" rel="noopener noreferrer" className="bg-white flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
                <button className='text-black font-bold btn-brutal px-4 py-2 w-full h-full' >
                  Instagram
                </button>
                </a>
                <a href="https://form.typeform.com/to/aCNLSr9B" target="_blank" rel="noopener noreferrer" className="bg-white flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
                <button className='text-black font-bold btn-brutal px-4 py-2 w-full h-full' >
                  Client?
                </button>
                </a>
              </div>
            </div>
          </div>
          
          {/* About Me Section */}
          <section className="mt-44">
            <h2 className="font-black mb-8">About Me</h2>
            <div className="border-2 p-6 mb-8">
              <p className="mb-4">{about.description}</p>
              <p className="mb-4">{about.details}</p>
              <p>{about.currentWork}</p>
            </div>
            
            {/* Database Pages Section */}
            <section className="mt-16">
              <h2 className="font-black mb-8">Database Pages</h2>
              {dbLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Loading pages from database...</span>
                </div>
              ) : dbError ? (
                <div className="text-red-500 p-4 border-2 border-red-500">
                  <p className="font-bold">Error:</p>
                  <p>{dbError}</p>
                  <p className="text-sm mt-2">Make sure your server is running on port 3000</p>
                </div>
              ) : dbPages.length > 0 ? (
                <div className="border-2 p-6">
                  <h3 className="font-bold mb-4">Pages from Neon DB:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dbPages.map((page) => (
                      <Link 
                        key={page.id} 
                        to={`/mindscape/${page.id}`}
                        className="block p-4 border-2 hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="font-bold">{page.headline}</h4>
                        <p className="text-sm text-gray-600">{page.subtitle}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-2 p-6">
                  <p>No pages found in database. Create pages to see them here.</p>
                </div>
              )}
            </section>
            
            {/* Contact Info */}
            <div className="flex gap-4">
              <div className="border-2 px-4 py-2 flex items-center gap-2">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
              <div className="border-2 px-4 py-2 flex items-center gap-2">
                <Mail size={16} />
                <span>{profile.email}</span>
              </div>
            </div>
          </section>
          {/* Social Links */}
          <section className="mt-16 flex gap-4">
            <a href="https://github.com/noeewa" target="_blank" rel="noopener noreferrer" className="bg-white btn-brutal p-3 flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
            <Github size={20} />
            </a>
            <a href="http://www.instagram.com/altha.cra" target="_blank" rel="noopener noreferrer" className="bg-white btn-brutal p-3 flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
            <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/althacra2025/" target="_blank" rel="noopener noreferrer" className="bg-white btn-brutal p-3 flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
            <Linkedin size={20} />
            </a>
          </section>

          
        </div>
      </main>
      </section>
      {/* About Me Section */}

      {/* Interest Section */}
      <section className="bg-background py-16 border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-black text-center mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-brutal p-6">
              <h3 className="font-black mb-4">{about.skills.frontend.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Expert Level:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {about.skills.frontend.expert.map((skill) => (
                      <span key={skill} className="btn-brutal text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Intermediate:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {about.skills.frontend.intermediate.map((skill) => (
                      <span key={skill} className="btn-brutal text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Beginner:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {about.skills.frontend.beginner.map((skill) => (
                      <span key={skill} className="btn-brutal text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-brutal p-6">
              <h3 className="font-black mb-4">{about.skills.backend.title}</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-lg btn-brutal">{about.skills.backend.skills[0]}</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <WorkflowSlider />

      {/* Timeline Section */}
      <TimelineSlider />

      {/* Contact Section */}
      <section className="bg-background py-16 border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-black mb-4">{contact.title}</h2>
          <p className="mb-8 max-w-2xl mx-auto">{contact.description}</p>
          <a href="https://form.typeform.com/to/aCNLSr9B" target="_blank" rel="noopener noreferrer" className='w-fit'>
          <button className="btn-brutal text-xl py-4 px-8">
            {contact.cta}
          </button></a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 text-center">
        <p className="mb-2">{siteConfig.footer.copyright}</p>
        <p className="text-sm italic">{siteConfig.footer.note}</p>
      </footer>
    </div>
  ); 
};

export default Home;