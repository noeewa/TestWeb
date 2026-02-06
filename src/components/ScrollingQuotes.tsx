import React from 'react';
import { siteConfig } from '@server/storage/siteConfig';

const ScrollingQuotes: React.FC = () => {
  const allQuotes = siteConfig.quotes.join(' ');
  
  return (
    <div className="bg-background border-t-[3px] border-b-[3px] border-black overflow-hidden py-4">
      <div className="scroll-text whitespace-nowrap text-lg font-bold uppercase tracking-wide">
        {allQuotes}
      </div>
    </div>
  );
};

export default ScrollingQuotes;