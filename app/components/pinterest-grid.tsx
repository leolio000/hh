"use client";

import { useState, useEffect } from "react";
import CreatorCard from "./creator-card";

interface Creator {
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
  gender: string;
  shootingType: string[];
  imageUrl?: string;
}

interface PinterestGridProps {
  creators: Creator[];
  onLoadMore: () => void;
  hasMore: boolean;
}

export default function PinterestGrid({ creators, onLoadMore, hasMore }: PinterestGridProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        if (!isLoading && hasMore) {
          setIsLoading(true);
          onLoadMore();
          setTimeout(() => setIsLoading(false), 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, onLoadMore]);

  return (
    <div className="w-full">
      {/* Portfolio Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
        {creators.map((creator) => (
          <div key={creator.id} className="break-inside-avoid mb-4 md:mb-6">
            <CreatorCard creator={creator} />
          </div>
        ))}
      </div>
      
      {/* Load More Section */}
      <div className="text-center py-12">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
          </div>
        ) : hasMore ? (
          <button 
            onClick={() => {
              setIsLoading(true);
              onLoadMore();
              setTimeout(() => setIsLoading(false), 1000);
            }}
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all duration-200 transform hover:scale-105"
          >
            Voir plus de créateurs
          </button>
        ) : (
          <div className="text-slate-600">
            <p className="text-lg mb-2">Vous avez vu tous les créateurs disponibles</p>
            <p className="text-sm">Revenez plus tard pour découvrir de nouveaux talents</p>
          </div>
        )}
      </div>
    </div>
  );
} 