"use client";

import { useState } from "react";

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
    price: string;
    responseTime: string;
    followers?: string;
    engagement?: string;
    imageUrl?: string;
  };
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Générer des hauteurs plus grandes pour les cartes
  const imageHeights = [400, 450, 500, 380, 420, 480, 440, 460, 520, 470, 490, 510];
  const randomHeight = imageHeights[creator.id % imageHeights.length];

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden hover-lift transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section - Portfolio Style */}
      <div className="relative overflow-hidden" style={{ height: `${randomHeight}px` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <div className="text-white text-8xl font-bold">{creator.avatar}</div>
          </div>
        </div>
        
        {/* Overlay on hover - Portfolio style */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-3">{creator.name}</h3>
            <p className="text-base mb-4 opacity-90">{creator.location}</p>
            <div className="flex gap-3 mb-6">
              {creator.specialties.slice(0, 2).map((specialty) => (
                <span 
                  key={specialty} 
                  className="text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <button className="bg-white text-slate-800 px-8 py-4 rounded-full font-semibold text-base transform scale-90 group-hover:scale-100 transition-transform duration-200">
              Voir le portfolio
            </button>
          </div>
        </div>

        {/* Price badge - Portfolio style */}
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full text-base font-semibold text-slate-800">
          {creator.price}
        </div>

        {/* Rating badge - Portfolio style */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full text-base font-semibold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {creator.rating}
        </div>
      </div>
    </div>
  );
} 