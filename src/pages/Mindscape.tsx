import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useLayoutEffect } from 'react';

const Mindscape: React.FC = () => {
  const { mindscape } = siteConfig;
  useLayoutEffect(()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
              Personal Journey & Thoughts
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            {mindscape.title}
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl">
            {mindscape.subtitle}
          </p>
        </div>
      </header>

      {/* Content Sections */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {mindscape.sections.map((section, index) => (
            <section key={index} className="flex gap-8">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                {index < mindscape.sections.length - 1 && (
                  <div className="w-[0.3px] h-full bg-white/30 mt-2"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h2 className="text-3xl font-black mb-6">{section.title}</h2>
                <div className="rounded-[4px] border-solid border-[0.0px] border-white/30  overflow-hidden p-6">
                  <p className="text-[16px] leading-relaxed whitespace-pre-line">
                    {section.content.map((item, index) => (
                      <span className='mb-4 block tracking-normal leading-normal' key={index}>{item}<br /></span>
                    ))}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Back to Portfolio */}
      <section className="py-16 text-center border-t border-gray-800">
        <h2 className="text-3xl font-black mb-4">Ready to explore more?</h2>
        <p className="text-lg text-gray-300 mb-8">
          Return to the main portfolio to see my work and projects
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>
      </section>

      {/* Footer Quote */}
      <footer className="py-8 text-center border-t border-gray-800">
        <p className="text-sm italic text-gray-400">
          {siteConfig.footer.note}
        </p>
      </footer>
    </div>
  );
};

export default Mindscape;