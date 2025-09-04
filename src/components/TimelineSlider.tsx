import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const TimelineSlider: React.FC = () => {
  const { timeline } = siteConfig;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % timeline.items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + timeline.items.length) % timeline.items.length);
  };

  return (
    <section className="bg-background py-16 border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">{timeline.title}</h2>
          <p className="text-lg">{timeline.subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline Track */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4 overflow-hidden">
              {timeline.items.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`w-4 h-4 rounded-full border-2 border-black transition-colors ${
                      index === currentIndex ? 'bg-black' : 'bg-white'
                    }`}
                  />
                  {index < timeline.items.length - 1 && (
                    <div className="w-16 h-0.5 bg-black mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="text-center min-h-[200px] flex flex-col justify-center">
            <div className="border-2 border-black p-8 bg-white">
              <h3 className="text-2xl font-black mb-2">
                {timeline.items[currentIndex].year}
              </h3>
              <h4 className="text-xl font-bold mb-4">
                {timeline.items[currentIndex].title}
              </h4>
              <p className="text-lg">
                {timeline.items[currentIndex].description}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="border-2 border-black bg-white hover:bg-black hover:text-white transition-colors p-3"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="border-2 border-black bg-white hover:bg-black hover:text-white transition-colors p-3"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSlider;