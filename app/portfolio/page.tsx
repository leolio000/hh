"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface PortfolioItem {
  id: number;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  description: string;
  category: string;
  mediaType: "video" | "image" | "story" | "reel";
  thumbnail: string;
  views: number;
  likes: number;
  brand?: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function PortfolioPage() {
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMediaType, setSelectedMediaType] = useState<string>("all");

  const allPortfolioItems: PortfolioItem[] = useMemo(() => [
    {
      id: 1,
      creatorId: 1,
      creatorName: "Melinda H.",
      creatorAvatar: "M",
      title: "Collection Beauté Été 2024",
      description: "Campagne complète pour une marque de cosmétiques avec photos et vidéos lifestyle",
      category: "Beauté",
      mediaType: "video",
      thumbnail: "/portfolio/beauty-summer.jpg",
      views: 12450,
      likes: 892,
      brand: "Yves Rocher",
      isFeatured: true,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      creatorId: 2,
      creatorName: "Cindy B.",
      creatorAvatar: "C",
      title: "Famille & Parenting",
      description: "Série de photos authentiques pour une marque de produits pour enfants",
      category: "Famille",
      mediaType: "image",
      thumbnail: "/portfolio/family-parenting.jpg",
      views: 8560,
      likes: 567,
      brand: "La Redoute",
      isFeatured: true,
      createdAt: "2024-01-12"
    },
    {
      id: 3,
      creatorId: 3,
      creatorName: "Yostina K.",
      creatorAvatar: "Y",
      title: "Tech Review - Nouveau Smartphone",
      description: "Vidéo de test et présentation pour une marque de téléphonie",
      category: "Tech",
      mediaType: "video",
      thumbnail: "/portfolio/tech-review.jpg",
      views: 23400,
      likes: 1234,
      brand: "Samsung",
      isFeatured: true,
      createdAt: "2024-01-10"
    },
    {
      id: 4,
      creatorId: 4,
      creatorName: "Alexandre D.",
      creatorAvatar: "A",
      title: "Gaming Setup Tour",
      description: "Présentation complète d'un setup gaming pour une marque d'accessoires",
      category: "Gaming",
      mediaType: "video",
      thumbnail: "/portfolio/gaming-setup.jpg",
      views: 18900,
      likes: 987,
      brand: "Razer",
      isFeatured: false,
      createdAt: "2024-01-08"
    },
    {
      id: 5,
      creatorId: 5,
      creatorName: "Sophie M.",
      creatorAvatar: "S",
      title: "Fitness Challenge - 30 jours",
      description: "Série de vidéos fitness pour motiver et accompagner les utilisateurs",
      category: "Fitness",
      mediaType: "reel",
      thumbnail: "/portfolio/fitness-challenge.jpg",
      views: 15600,
      likes: 745,
      brand: "Nike",
      isFeatured: false,
      createdAt: "2024-01-05"
    },
    {
      id: 6,
      creatorId: 6,
      creatorName: "Thomas L.",
      creatorAvatar: "T",
      title: "Aventure en Montagne",
      description: "Photos et vidéos d'expédition pour une marque de sport outdoor",
      category: "Sport",
      mediaType: "image",
      thumbnail: "/portfolio/mountain-adventure.jpg",
      views: 9200,
      likes: 432,
      brand: "The North Face",
      isFeatured: false,
      createdAt: "2024-01-03"
    },
    {
      id: 7,
      creatorId: 7,
      creatorName: "Emma R.",
      creatorAvatar: "E",
      title: "Mode Lifestyle - Collection Printemps",
      description: "Shooting photo complet pour une marque de prêt-à-porter",
      category: "Mode",
      mediaType: "image",
      thumbnail: "/portfolio/fashion-spring.jpg",
      views: 18700,
      likes: 1100,
      brand: "Zara",
      isFeatured: true,
      createdAt: "2024-01-01"
    },
    {
      id: 8,
      creatorId: 8,
      creatorName: "Lucas P.",
      creatorAvatar: "L",
      title: "Business Tips - Entrepreneuriat",
      description: "Série de vidéos courtes avec conseils business pour jeunes entrepreneurs",
      category: "Business",
      mediaType: "story",
      thumbnail: "/portfolio/business-tips.jpg",
      views: 13400,
      likes: 678,
      brand: "LinkedIn",
      isFeatured: false,
      createdAt: "2023-12-28"
    }
  ], []);

  const categories = ["all", "Beauté", "Mode", "Famille", "Tech", "Gaming", "Fitness", "Sport", "Business"];
  const mediaTypes = ["all", "video", "image", "story", "reel"];

  useEffect(() => {
    setFilteredItems(allPortfolioItems);
  }, [allPortfolioItems]);

  useEffect(() => {
    let filtered = allPortfolioItems;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedMediaType !== "all") {
      filtered = filtered.filter(item => item.mediaType === selectedMediaType);
    }

    setFilteredItems(filtered);
  }, [selectedCategory, selectedMediaType, allPortfolioItems]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'image': return '📸';
      case 'story': return '📱';
      case 'reel': return '🎬';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 md:mb-8">
            Portfolio des
            <br />
            <span className="font-medium">Créateurs UGC</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez les meilleures réalisations de nos créateurs. 
            Des contenus authentiques qui ont fait leurs preuves.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">2,847+</div>
              <div className="text-white/80 text-xs md:text-sm">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">15.2M+</div>
              <div className="text-white/80 text-xs md:text-sm">Vues totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">98%</div>
              <div className="text-white/80 text-xs md:text-sm">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Catégorie:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "Toutes les catégories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Media Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <select
                value={selectedMediaType}
                onChange={(e) => setSelectedMediaType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                {mediaTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "Tous les types" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              Nos Meilleures Réalisations
            </h2>
            <p className="text-gray-600">
              {filteredItems.length} projets trouvés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl">
                      {getMediaTypeIcon(item.mediaType)}
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {item.isFeatured && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Vedette
                    </div>
                  )}
                  
                  {/* Brand Badge */}
                  {item.brand && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-900">
                      {item.brand}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {item.creatorAvatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.creatorName}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{formatNumber(item.views)} vues</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{formatNumber(item.likes)} likes</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/portfolio/${item.id}`}>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                      Voir le projet
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos filtres</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-gray-900">
            Prêt à créer votre projet ?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Rejoignez les marques qui font confiance à nos créateurs pour leurs campagnes UGC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                Trouver un créateur
              </button>
            </Link>
            <Link href="/creators">
              <button className="px-8 py-4 bg-transparent border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                Voir tous les créateurs
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 