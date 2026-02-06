import React from 'react';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

const Lobby: React.FC = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 -mt-24">
      {/* Header */}
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
              Navigator
            </span>
          </div>
          
          <h1 className="font-black mb-6">
            Mindscape
          </h1>
          
          <p className="text-gray-300 max-w-2xl">
            Choose your journey
          </p>
        </div>
      </header>

      {/* Content - Blank for now */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Blank content area */}
        </div>
      </main>

      {/* Footer with Links */}
      <footer className="py-16 text-center border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-black mb-8">Back To Home</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
            >
              XXX
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Lobby;
