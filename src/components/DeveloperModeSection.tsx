import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowRight } from 'lucide-react';

const DeveloperModeSection: React.FC = () => {
  return (
    <section className="py-16 px-6 border-t border-gray-800 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Code size={24} className="text-cyan-400" />
          <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
            Developer Mode
          </span>
        </div>
        
        <h2 className="font-black mb-6 text-white">
          Technical Topics
        </h2>
        
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Dive deeper into technical concepts, code insights, and development experiences
        </p>
        
        <Link 
          to="/developer"
          className="inline-flex items-center gap-2 bg-cyan-400 text-black px-6 py-3 font-bold hover:bg-cyan-300 transition-colors rounded-md"
        >
          Enter Developer Mode
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default DeveloperModeSection;