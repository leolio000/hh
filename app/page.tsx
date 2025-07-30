"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedText from "./components/animated-text";
import PinterestGrid from "./components/pinterest-grid";
import SearchFilters from "./components/search-filters";

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

export default function HomePage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const animatedTexts = [
    "vos social ads.",
    "votre page TikTok.",
    "votre agence.",
    "vos posts Insta.",
    "votre marque."
  ];

  const countries = [
    "États-Unis", "France", "Espagne", "Italie", "Canada", "Belgique"
  ];

  const allCreators: Creator[] = [
    {
      id: 1,
      name: "Melinda H.",
      location: "Saint-Raphaël, France",
      rating: 5.0,
      reviews: 50,
      specialties: ["Beauté", "Mode", "Lifestyle"],
      avatar: "M",
      photo: "/creators/melinda.jpg",
      price: "€200-500",
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
      price: "€150-400",
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
      price: "€300-800",
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
      price: "€250-600",
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
      price: "€180-450",
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
      price: "€220-550",
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
      price: "€280-650",
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
      price: "€200-480",
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
      price: "€320-750",
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
      price: "€180-420",
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
      price: "€280-650",
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
      price: "€220-500",
      responseTime: "6h",
      followers: "38K",
      engagement: "7.2",
      gender: "Homme",
      shootingType: ["Solo", "Couple"]
    }
  ];

  const categories = [
    "Beauté", "Mode", "Lifestyle", "Famille", "Parenting", "Tech", 
    "Gaming", "Fitness", "Nutrition", "Sport", "Aventure", "Voyage",
    "Art", "Business", "Food", "Travel"
  ];

  useEffect(() => {
    // Simuler le chargement initial
    setCreators(allCreators.slice(0, 12));
    setFilteredCreators(allCreators.slice(0, 12));
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
    priceRange?: string;
    rating?: string;
  }) => {
    let filtered = creators;

    if (filters.category) {
      filtered = filtered.filter(creator =>
        creator.specialties.includes(filters.category)
      );
    }

    if (filters.location) {
      filtered = filtered.filter(creator =>
        creator.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(creator => {
        const price = parseInt(creator.price.replace(/[^\d]/g, ''));
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
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
    <div className="min-h-screen">
      {/* Hero Section - Fixed */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-white">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 md:w-72 md:h-72 bg-slate-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 md:w-96 md:h-96 bg-slate-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-slate-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl lg:text-6xl font-bold text-slate-900">
                OVO
              </h1>
              <p className="text-3xl font-bold lg:text-6xl text-slate-900">
                <span className="inline">
                  Découvrez les meilleurs
                  <span className="inline-block -rotate-1 rounded-lg bg-slate-900 px-2 md:px-3 pb-1 text-white outline outline-1 outline-offset-1 outline-slate-300 text-sm md:text-base lg:text-lg">
                    créateurs UGC
                  </span>
                  <br />
                  pour booster
                </span>
                <AnimatedText texts={animatedTexts} interval={1800} />
              </p>
            </div>

            <p className="text-xl lg:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto lg:mx-0">
              Ne tombez plus jamais à court de créa publicitaires et organiques avec notre plateforme UGC, la meilleure pour connecter créateurs et marques.
            </p>

            {/* Search Bar */}
            <div className="mb-8">
              <form className="mb-6 hidden max-w-lg items-stretch rounded-full bg-white border border-slate-200 p-2 text-slate-900 lg:flex mx-auto lg:mx-0 shadow-sm">
                <svg className="ml-2 mr-3 w-6 h-6 self-center text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  className="grow focus:outline-none" 
                  placeholder="Rechercher un secteur d'activité..."
                />
                <button className="bg-slate-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-200 text-sm md:text-base">
                  Voir les créateurs
                </button>
              </form>

              <div className="mb-4 text-center lg:hidden">
                <Link href="/creators">
                  <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-200 text-sm md:text-base">
                    Voir les créateurs
                  </button>
                </Link>
              </div>
            </div>

            {/* Country Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {countries.map((country) => (
                <Link key={country} href={`/creators?country=${country}`}>
                  <button className="text-xs px-3 py-2 rounded-full font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                    {country}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section - Infinite Scroll */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">
              Marques qui nous font confiance
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Plus de 500+ marques nous font confiance pour leurs campagnes UGC
            </p>
          </div>
          
          {/* Infinite Scroll Brands */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-8 md:gap-12 flex-shrink-0">
                  {[
                    "Nike", "Adidas", "Apple", "Samsung", "Coca-Cola", "Pepsi",
                    "McDonald's", "KFC", "Starbucks", "Dunkin'", "Netflix", "Disney",
                    "Amazon", "Walmart", "Target", "Best Buy", "Home Depot", "Lowe's"
                  ].map((brand, brandIndex) => (
                    <div 
                      key={`${index}-${brandIndex}`}
                      className="bg-slate-50 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center hover-lift transition-all duration-300 min-w-[120px] md:min-w-[160px] hover:bg-slate-100 hover:scale-105"
                    >
                      <span className="text-slate-600 font-medium text-center text-xs md:text-sm whitespace-nowrap">
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creators Section - Pinterest Grid with Infinite Scroll */}
      <section className="bg-slate-50 min-h-screen">
        {/* Search and Filters */}
        <SearchFilters 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={categories}
        />

        {/* Creators Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">
              Découvrez nos Créateurs UGC
            </h2>
            <p className="text-slate-600">
              +5099 créateurs vérifiés disponibles pour vos projets
            </p>
          </div>
          
          <PinterestGrid 
            creators={filteredCreators}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
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
              En 3 étapes simples, connectez-vous avec les meilleurs créateurs UGC
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
                Parcourez notre catalogue de créateurs UGC vérifiés. Filtrez par spécialité, localisation, prix et note.
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
                Contactez directement les créateurs qui vous intéressent. Échangez sur vos besoins et votre projet.
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
                Lancez votre projet et recevez du contenu UGC de qualité pour vos campagnes marketing.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            <Link href="/creators">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all duration-200 transform hover:scale-105">
                Commencer maintenant
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
