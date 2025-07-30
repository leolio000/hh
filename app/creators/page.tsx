"use client";

import { useState, useEffect, useMemo } from "react";

import SearchFilters from "../components/search-filters";
import CreatorCard from "../components/creator-card";

interface Creator {
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
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const allCreators: Creator[] = useMemo(() => [
    {
      id: 1,
      name: "Melinda H.",
      location: "Saint-Raphaël, France",
      rating: 5.0,
      reviews: 50,
      specialties: ["Beauté", "Mode", "Lifestyle"],
      avatar: "M",
      photo: "/creators/melinda.jpg",
      responseTime: "12h",
      followers: "45K",
      engagement: "8.2",
      gender: "Femme",
      shootingType: ["Couple", "Famille"]
    },
    {
      id: 2,
      name: "Cindy B.",
      location: "Isère, France", 
      rating: 5.0,
      reviews: 103,
      specialties: ["Famille", "Parenting", "Lifestyle"],
      avatar: "C",
      photo: "/creators/cindy.jpg",
      responseTime: "8h",
      followers: "32K",
      engagement: "12.5",
      gender: "Femme",
      shootingType: ["Famille", "Parent"]
    },
    {
      id: 3,
      name: "Yostina K.",
      location: "Paris, France",
      rating: 5.0,
      reviews: 46,
      specialties: ["Beauté", "Mode", "Tech"],
      avatar: "Y",
      photo: "/creators/yostina.jpg",
      responseTime: "1h",
      followers: "78K",
      engagement: "15.8",
      gender: "Femme",
      shootingType: ["Couple", "Amis"]
    },
    {
      id: 4,
      name: "Alexandre D.",
      location: "Lyon, France",
      rating: 4.9,
      reviews: 87,
      specialties: ["Tech", "Gaming", "Lifestyle"],
      avatar: "A",
      photo: "/creators/alexandre.jpg",
      responseTime: "4h",
      followers: "56K",
      engagement: "9.3",
      gender: "Homme",
      shootingType: ["Couple", "Amis"]
    },
    {
      id: 5,
      name: "Sophie M.",
      location: "Marseille, France",
      rating: 4.8,
      reviews: 124,
      specialties: ["Beauté", "Fitness", "Nutrition"],
      avatar: "S",
      photo: "/creators/sophie.jpg",
      responseTime: "6h",
      followers: "41K",
      engagement: "11.2",
      gender: "Femme",
      shootingType: ["Couple", "Famille"]
    },
    {
      id: 6,
      name: "Thomas L.",
      location: "Bordeaux, France",
      rating: 4.7,
      reviews: 93,
      specialties: ["Sport", "Aventure", "Voyage"],
      avatar: "T",
      photo: "/creators/thomas.jpg",
      responseTime: "10h",
      followers: "38K",
      engagement: "7.8",
      gender: "Homme",
      shootingType: ["Couple", "Amis"]
    },
    {
      id: 7,
      name: "Emma R.",
      location: "Toulouse, France",
      rating: 4.9,
      reviews: 67,
      specialties: ["Beauté", "Mode", "Art"],
      avatar: "E",
      photo: "/creators/emma.jpg",
      responseTime: "3h",
      followers: "52K",
      engagement: "13.4",
      gender: "Femme",
      shootingType: ["Couple", "Solo"]
    },
    {
      id: 8,
      name: "Lucas P.",
      location: "Nantes, France",
      rating: 4.6,
      reviews: 89,
      specialties: ["Tech", "Business", "Lifestyle"],
      avatar: "L",
      photo: "/creators/lucas.jpg",
      responseTime: "5h",
      followers: "35K",
      engagement: "8.9",
      gender: "Homme",
      shootingType: ["Solo", "Couple"]
    },
    {
      id: 9,
      name: "Marie L.",
      location: "Strasbourg, France",
      rating: 4.8,
      reviews: 156,
      specialties: ["Beauté", "Mode", "Art"],
      avatar: "M",
      photo: "/creators/marie.jpg",
      responseTime: "2h",
      followers: "89K",
      engagement: "16.2",
      gender: "Femme",
      shootingType: ["Solo", "Couple"]
    },
    {
      id: 10,
      name: "Pierre D.",
      location: "Nice, France",
      rating: 4.7,
      reviews: 78,
      specialties: ["Sport", "Fitness", "Aventure"],
      avatar: "P",
      photo: "/creators/pierre.jpg",
      responseTime: "8h",
      followers: "42K",
      engagement: "9.8",
      gender: "Homme",
      shootingType: ["Solo", "Couple"]
    },
    {
      id: 11,
      name: "Julie M.",
      location: "Montpellier, France",
      rating: 4.9,
      reviews: 203,
      specialties: ["Lifestyle", "Food", "Travel"],
      avatar: "J",
      photo: "/creators/julie.jpg",
      responseTime: "4h",
      followers: "67K",
      engagement: "14.5",
      gender: "Femme",
      shootingType: ["Couple", "Famille"]
    },
    {
      id: 12,
      name: "Antoine R.",
      location: "Rennes, France",
      rating: 4.5,
      reviews: 92,
      specialties: ["Tech", "Gaming", "Business"],
      avatar: "A",
      photo: "/creators/antoine.jpg",
      responseTime: "6h",
      followers: "38K",
      engagement: "7.2",
      gender: "Homme",
      shootingType: ["Solo", "Couple"]
    }
  ], []);

  const categories = [
    "Beauté", "Mode", "Lifestyle", "Famille", "Parenting", "Tech", 
    "Gaming", "Fitness", "Nutrition", "Sport", "Aventure", "Voyage",
    "Art", "Business", "Food", "Travel"
  ];

  useEffect(() => {
    // Simuler le chargement initial
    setCreators(allCreators);
    setFilteredCreators(allCreators);
    setLoading(false);
  }, [allCreators]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCreators(creators);
      return;
    }

    const filtered = creators.filter(creator =>
      creator.name.toLowerCase().includes(query.toLowerCase()) ||
      creator.location.toLowerCase().includes(query.toLowerCase()) ||
      creator.specialties.some(specialty => 
        specialty.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredCreators(filtered);
  };

  const handleFilterChange = (filters: {
    category?: string;
    location?: string;
    rating?: string;
  }) => {
    let filtered = creators;

    if (filters.category) {
      filtered = filtered.filter(creator =>
        creator.specialties.includes(filters.category!)
      );
    }

    if (filters.location) {
      filtered = filtered.filter(creator =>
        creator.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(creator => creator.rating >= minRating);
    }

    setFilteredCreators(filtered);
  };

  const handleLoadMore = () => {
    // Simuler le chargement de plus de créateurs
    const nextPage = currentPage + 1;
    const newCreators = allCreators.slice(0, nextPage * 6);
    
    setCreators(newCreators);
    setFilteredCreators(newCreators);
    setCurrentPage(nextPage);
    
    if (nextPage * 6 >= allCreators.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 md:mb-8">
            Découvrez les
            <br />
            <span className="font-medium">Meilleurs Créateurs UGC</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre base de données complète de créateurs vérifiés. 
            Filtrez par spécialité, localisation, budget et plus encore.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">5,099+</div>
              <div className="text-white/80 text-xs md:text-sm">Créateurs vérifiés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">98%</div>
              <div className="text-white/80 text-xs md:text-sm">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">24h</div>
              <div className="text-white/80 text-xs md:text-sm">Temps de réponse</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <SearchFilters 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        categories={categories}
      />

      {/* Results Section */}
      <section className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">
              Nos Créateurs
            </h2>
            <p className="text-slate-600">
              {filteredCreators.length} créateurs disponibles
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="w-full">
              {/* Portfolio Masonry Grid - Style Pinterest exact UNIQUEMENT sur mobile */}
              <div className="mobile-grid" style={{
                columns: window.innerWidth < 768 ? '2' : '1',
                columnGap: window.innerWidth < 768 ? '8px' : '0',
                padding: window.innerWidth < 768 ? '8px' : '0',
                width: '100%',
                display: window.innerWidth < 768 ? 'block' : 'grid',
                gridTemplateColumns: window.innerWidth >= 768 && window.innerWidth < 1280 ? 'repeat(2, 1fr)' : 
                                   window.innerWidth >= 1280 && window.innerWidth < 1536 ? 'repeat(3, 1fr)' :
                                   window.innerWidth >= 1536 ? 'repeat(4, 1fr)' : 'auto',
                gap: window.innerWidth >= 768 && window.innerWidth < 1024 ? '40px' :
                     window.innerWidth >= 1024 && window.innerWidth < 1280 ? '48px' :
                     window.innerWidth >= 1280 && window.innerWidth < 1536 ? '56px' :
                     window.innerWidth >= 1536 ? '64px' : 'auto'
              }}>
                {filteredCreators.map((creator) => (
                  <div key={creator.id} className="pinterest-card" style={{
                    breakInside: window.innerWidth < 768 ? 'avoid' : 'auto',
                    marginBottom: window.innerWidth < 768 ? '8px' : '0',
                    borderRadius: window.innerWidth < 768 ? '16px' : '12px',
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: window.innerWidth < 768 
                      ? '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                    display: 'block',
                    width: '100%'
                  }}>
                    <CreatorCard creator={creator} />
                  </div>
                ))}
              </div>
              
              {/* Load More Section - Optimisé pour mobile */}
              <div className="text-center py-8 md:py-12">
                {hasMore ? (
                  <button 
                    onClick={handleLoadMore}
                    className="bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-slate-800 transition-all duration-200 transform hover:scale-105 mobile-btn"
                  >
                    Voir plus de créateurs
                  </button>
                ) : (
                  <div className="text-slate-600">
                    <p className="text-base md:text-lg mb-2">Vous avez vu tous les créateurs disponibles</p>
                    <p className="text-sm">Revenez plus tard pour découvrir de nouveaux talents</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              En 3 étapes simples, trouvez et collaborez avec les créateurs UGC parfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                Recherchez
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Utilisez nos filtres avancés pour trouver les créateurs qui correspondent à vos besoins.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                Contactez
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Envoyez votre brief et négociez directement avec les créateurs sélectionnés.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                Collaborez
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Recevez votre contenu UGC authentique et boostez vos campagnes marketing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 