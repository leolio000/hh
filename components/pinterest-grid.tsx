"use client";

import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    await onLoadMore();
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {creators.map((creator) => (
          <div key={creator.id} className="break-inside-avoid">
            <CreatorCard creator={creator} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Chargement...
              </div>
            ) : (
              "Charger plus de créateurs"
            )}
          </button>
        </div>
      )}

      {/* No Results */}
      {creators.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun créateur trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
} 