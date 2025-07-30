"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

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
  bio?: string;
  experience?: string;
  languages?: string[];
  equipment?: string[];
  previousBrands?: string[];
}

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  brand: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  brand: string;
  category: string;
}

export default function PortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'reviews'>('overview');
  const [loading, setLoading] = useState(true);
  const [creatorId, setCreatorId] = useState<string | null>(null);

  // Données simulées du créateur
  const creatorData: Creator = useMemo(() => ({
    id: creatorId ? parseInt(creatorId) : 1,
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
    shootingType: ["Couple", "Famille"],
    bio: "Créatrice de contenu passionnée avec 5 ans d'expérience dans la création de contenu UGC authentique. Spécialisée dans la beauté, la mode et le lifestyle, je collabore avec des marques pour créer du contenu engageant et authentique.",
    experience: "5 ans",
    languages: ["Français", "Anglais"],
    equipment: ["iPhone 14 Pro", "Canon EOS R6", "Éclairage professionnel"],
    previousBrands: ["L'Oréal", "Sephora", "Zara", "Nike", "Apple"]
  }), [creatorId]);

  // Données simulées des avis
  const reviewsData: Review[] = useMemo(() => [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      comment: "Melinda a créé un contenu exceptionnel pour notre campagne. Professionnelle, créative et très réactive. Je recommande vivement !",
      date: "2024-01-15",
      brand: "L'Oréal"
    },
    {
      id: 2,
      author: "Pierre D.",
      rating: 5,
      comment: "Collaboration parfaite ! Melinda a parfaitement compris notre vision et a livré un contenu de qualité. Très satisfait.",
      date: "2024-01-10",
      brand: "Sephora"
    },
    {
      id: 3,
      author: "Marie L.",
      rating: 5,
      comment: "Excellent travail, délais respectés, communication fluide. Le contenu a dépassé nos attentes. Merci Melinda !",
      date: "2024-01-05",
      brand: "Zara"
    }
  ], []);

  // Données simulées des vidéos
  const videosData: Video[] = useMemo(() => [
    {
      id: 1,
      title: "Routine beauté matinale",
      description: "Découvrez ma routine beauté complète avec les produits L'Oréal",
      thumbnail: "/videos/thumbnail1.jpg",
      duration: "3:45",
      views: "125K",
      brand: "L'Oréal",
      category: "Beauté"
    },
    {
      id: 2,
      title: "Essai produits Sephora",
      description: "Test et avis honnêtes sur les nouveautés Sephora",
      thumbnail: "/videos/thumbnail2.jpg",
      duration: "5:20",
      views: "89K",
      brand: "Sephora",
      category: "Beauté"
    },
    {
      id: 3,
      title: "Look mode Zara",
      description: "Comment styliser les nouvelles pièces Zara",
      thumbnail: "/videos/thumbnail3.jpg",
      duration: "4:15",
      views: "67K",
      brand: "Zara",
      category: "Mode"
    }
  ], []);

  useEffect(() => {
    // Handle async params
    const loadParams = async () => {
      const resolvedParams = await params;
      setCreatorId(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!creatorId) return;
    
    // Simuler le chargement des données
    setTimeout(() => {
      setCreator(creatorData);
      setReviews(reviewsData);
      setVideos(videosData);
      setLoading(false);
    }, 1000);
  }, [creatorId, creatorData, reviewsData, videosData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Créateur non trouvé</h1>
          <Link href="/creators" className="text-blue-600 hover:text-blue-800">
            Retour aux créateurs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/creators" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl md:text-3xl font-light text-gray-900">
              Portfolio de {creator.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Creator Profile */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-600 to-slate-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-6xl md:text-8xl font-bold">{creator.avatar}</div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Main Info */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                  {creator.name}
                </h2>
                <p className="text-gray-600 mb-4">{creator.location}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-900 font-semibold">{creator.rating}</span>
                  <span className="text-gray-500">({creator.reviews} avis)</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {creator.specialties.map((specialty) => (
                    <span key={specialty} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.followers}</div>
                    <div className="text-sm text-gray-500">Abonnés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.engagement}%</div>
                    <div className="text-sm text-gray-500">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.responseTime}</div>
                    <div className="text-sm text-gray-500">Réponse</div>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <div className="md:w-64">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors mobile-btn">
                  Contacter {creator.name}
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Prix négociés directement
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Aperçu
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'videos' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Vidéos ({videos.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Avis ({reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">À propos</h3>
                  <p className="text-gray-600 leading-relaxed">{creator.bio}</p>
                </div>

                {/* Experience & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Expérience</h3>
                    <p className="text-gray-600">{creator.experience} d&rsquo;expérience</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Langues</h3>
                    <div className="flex flex-wrap gap-2">
                      {creator.languages?.map((language) => (
                        <span key={language} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Équipement</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.equipment?.map((item) => (
                      <span key={item} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Previous Brands */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Marques précédentes</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.previousBrands?.map((brand) => (
                      <span key={brand} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-gray-100 rounded-xl overflow-hidden">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <div className="text-gray-500 text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">Vidéo {video.id}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{video.duration}</span>
                        <span>{video.views} vues</span>
                      </div>
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {video.brand}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.author}</h4>
                        <p className="text-sm text-gray-500">{review.brand}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-3">{review.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 