"use client";

import React from "react";

interface MarqueeStripProps {
  text?: string;
  className?: string;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({
  text = "Walk. Share. Explore. Earn. • 100 Points = ₹250 • Original Content Only • Verified Community • ",
  className = "",
}) => {
  const repeatedText = `${text} ${text} ${text} ${text} `;

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 w-full ${className}`}>
      <div className="relative w-full overflow-hidden select-none py-3 px-6 bg-navy-900 text-white rounded-pill shadow-navy-glow flex items-center">
        <div className="flex w-max animate-marquee whitespace-nowrap text-xs sm:text-sm font-heading font-bold tracking-wide">
          <span>{repeatedText}</span>
          <span>{repeatedText}</span>
        </div>
      </div>
    </div>
  );
};
