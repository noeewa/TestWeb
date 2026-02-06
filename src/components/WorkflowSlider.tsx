import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '@server/storage/siteConfig';

const WorkflowSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { workflow } = siteConfig;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % workflow.items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + workflow.items.length) % workflow.items.length);
  };

  return (
    <section className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-black text-center mb-2">{workflow.title}</h2>
        <p className="text-center mb-8">{workflow.subtitle}</p>
        
        <div className="relative">
          <div className="card-brutal p-8 min-h-[120px] flex flex-col justify-center">
            <h3 className="font-black mb-4">{workflow.items[currentIndex].title}</h3>
            <p>{workflow.items[currentIndex].description}</p>
          </div>
          
          <div className="flex justify-between mt-6">
            <button 
              onClick={prevSlide}
              className="btn-brutal flex items-center gap-2"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            <div className="flex gap-2 items-center">
              {workflow.items.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 border-2 border-black ${
                    index === currentIndex ? 'bg-black' : 'bg-background'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="btn-brutal flex items-center gap-2"
              disabled={currentIndex === workflow.items.length - 1}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSlider;