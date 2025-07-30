"use client";

import { useEffect, useState } from "react";

interface Brand {
  name: string;
  logo?: string;
}

interface BrandsCarouselProps {
  brands: Brand[];
  speed?: number;
}

export default function BrandsCarousel({ brands, speed = 30 }: BrandsCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        // Reset position when reaching the end
        if (prev >= 100) {
          return 0;
        }
        return prev + 0.3;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="relative overflow-hidden bg-white py-8 md:py-12">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <div 
        className="flex items-center gap-8 md:gap-12"
        style={{
          transform: `translateX(-${scrollPosition}%)`,
          transition: 'transform 0.1s linear'
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div 
            key={index}
            className="flex-shrink-0 bg-gray-100 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center hover-lift transition-all duration-300 min-w-[120px] md:min-w-[160px] hover:bg-gray-200 hover:scale-105"
          >
            <span className="text-gray-600 font-medium text-center text-xs md:text-sm whitespace-nowrap">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 