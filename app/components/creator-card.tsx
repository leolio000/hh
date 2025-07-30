"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CreatorCardProps {
  creator: {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    specialties: string[];
    avatar: string;
    photo: string;
    responseTime: string;
    followers?: string;
    engagement?: string;
    gender: string;
    shootingType: string[];
    imageUrl?: string;
  };
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Hauteurs plus raisonnables pour éviter le débordement
  const imageHeights = [200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420];
  const desktopImageHeights = [300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520];
  const randomHeight = imageHeights[creator.id % imageHeights.length];
  const desktopRandomHeight = desktopImageHeights[creator.id % desktopImageHeights.length];
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href={`/portfolio/${creator.id}`} className="block w-full">
      <div 
        className="bg-white rounded-2xl overflow-hidden hover-lift transition-all duration-300 cursor-pointer group w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
        }}
      >
        {/* Image Section - Hauteurs corrigées */}
        <div className="relative overflow-hidden" style={{ 
          height: `${isClient && window.innerWidth >= 768 ? desktopRandomHeight : randomHeight}px`,
          borderRadius: '16px 16px 0 0'
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
              <div className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold">{creator.avatar}</div>
            </div>
          </div>

          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 md:p-3 lg:p-4 xl:p-5">
              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold mb-1 md:mb-2 lg:mb-3 xl:mb-4 text-center">{creator.name}</h3>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-2 md:mb-3 lg:mb-4 xl:mb-5 opacity-90 text-center">{creator.location}</p>
              <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 xl:gap-4 mb-3 md:mb-4 lg:mb-5 xl:mb-6 justify-center">
                {creator.specialties.slice(0, 2).map((specialty) => (
                  <span
                    key={specialty} 
                    className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl bg-white/20 backdrop-blur-sm px-2 md:px-3 lg:px-4 xl:px-5 py-1 md:py-1.5 lg:py-2 xl:py-2.5 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <button className="bg-white text-slate-800 px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-8 py-1.5 md:py-2 lg:py-2.5 xl:py-3 2xl:py-4 rounded-full font-semibold text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl transform scale-90 group-hover:scale-100 transition-transform duration-200 mobile-btn">
                Voir le portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 