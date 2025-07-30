"use client";

import { useState, useEffect, useMemo } from "react";
import PinterestGrid from "@/components/pinterest-grid";
import SearchFilters from "@/components/search-filters";

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

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
    }
  ], []);

  const categories = [
    "Beauté", "Mode", "Lifestyle", "Famille", "Parenting", "Tech", 
    "Gaming", "Fitness", "Nutrition", "Sport", "Aventure", "Voyage",
    "Art", "Business", "Food", "Travel"
  ];

  useEffect(() => {
    // Simuler le chargement initial
    setCreators(allCreators.slice(0, 6));
    setFilteredCreators(allCreators.slice(0, 6));
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
        creator.specialties.includes(filters.category!)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
            Découvrez nos Créateurs UGC
          </h1>
          <p className="text-gray-600">
            +5099 créateurs vérifiés disponibles pour vos projets
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilters 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        categories={categories}
      />

      {/* Creators Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PinterestGrid 
          creators={filteredCreators}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
} 