"use client";

import { useState, useEffect, useMemo } from "react";
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
    "vos campagnes publicitaires.",
    "vos shootings photo.",
    "vos contenus UGC.",
    "vos événements.",
    "votre communication."
  ];

  const countries = [
    "États-Unis", "France", "Espagne", "Italie", "Canada", "Belgique"
  ];



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
    // Load initial creators
    const initialCreators = allCreators.slice(0, 6);
    setCreators(initialCreators);
    setFilteredCreators(initialCreators);
  }, [allCreators]);

  // Autoplay carousel functionality
  useEffect(() => {
    let autoplayInterval: NodeJS.Timeout;
    const carousel = document.getElementById('testimonials-carousel');
    const playPauseBtn = document.getElementById('play-pause-btn');
    
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        if (carousel && playPauseBtn?.classList.contains('playing')) {
          const currentScroll = carousel.scrollLeft;
          const itemWidth = carousel.offsetWidth;
          const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
          
          if (currentScroll >= maxScroll) {
            // Reset to beginning
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carousel.scrollTo({
              left: currentScroll + itemWidth,
              behavior: 'smooth'
            });
          }
        }
      }, 4000); // Change slide every 4 seconds
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    // Start autoplay initially
    startAutoplay();

    // Cleanup on unmount
    return () => {
      stopAutoplay();
    };
  }, []);

  // Apple TV+ Style Carousel functionality
  useEffect(() => {
    let currentSlide = 0;
    const totalSlides = 4;
    let autoplayInterval: NodeJS.Timeout;
    
    const gallery = document.getElementById('testimonials-gallery');
    const items = gallery?.querySelectorAll('.gallery-item');
    const dots = gallery?.querySelectorAll('.dotnav-item');
    const playPauseBtn = gallery?.querySelector('.tv-plus-gallery-play-pause');
    const prevBtn = gallery?.querySelector('.paddlenav-arrow-previous');
    const nextBtn = gallery?.querySelector('.paddlenav-arrow-next');
    
    const showSlide = (index: number) => {
      if (!items || !dots) return;
      
      // Update current slide
      items.forEach((item, i) => {
        const element = item as HTMLElement;
        if (i === index) {
          element.classList.add('current');
          element.style.transform = 'translate(0px, 0px)';
          element.style.zIndex = '2';
        } else {
          element.classList.remove('current');
          // Calculate position with margin
          const margin = 20; // 20px margin between slides
          const slideWidth = 100 + (margin / 10); // 100% + margin
          element.style.transform = `translate(${(i - index) * slideWidth}%, 0px)`;
          element.style.zIndex = '1';
        }
      });
      
      // Update dots
      dots.forEach((dot, i) => {
        const element = dot as HTMLElement;
        if (i === index) {
          element.classList.add('current');
          element.setAttribute('aria-selected', 'true');
          element.setAttribute('tabindex', '0');
        } else {
          element.classList.remove('current');
          element.setAttribute('aria-selected', 'false');
          element.setAttribute('tabindex', '-1');
        }
      });
      
      currentSlide = index;
    };
    
    const nextSlide = () => {
      // Continuous loop without reset to zero
      const nextIndex = (currentSlide + 1) % totalSlides;
      showSlide(nextIndex);
    };
    
    const prevSlide = () => {
      // Continuous loop without reset to zero
      const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(prevIndex);
    };
    
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        if (playPauseBtn?.classList.contains('playing')) {
          nextSlide();
        }
      }, 5000);
    };
    
    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };
    
    // Event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
      });
    }
    
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (playPauseBtn.classList.contains('playing')) {
          playPauseBtn.classList.remove('playing');
          playPauseBtn.classList.add('paused');
          stopAutoplay();
        } else {
          playPauseBtn.classList.remove('paused');
          playPauseBtn.classList.add('playing');
          startAutoplay();
        }
      });
    }
    
    // Dot navigation
    dots?.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoplay();
        startAutoplay();
      });
    });
    
    // Start autoplay initially
    startAutoplay();
    
    // Cleanup
    return () => {
      stopAutoplay();
    };
  }, []);

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
    <div className="min-h-screen bg-gray-50 mobile-scroll">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-16 md:py-24 px-4 mobile-section">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 md:mb-8">
            Trouvez les modèles et créateurs pour
                  <br />
            <span className="font-medium">
              <AnimatedText texts={animatedTexts} />
                </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Première agence française spécialisée dans les modèles, shootings photo, publicité et UGC. 
            <span className="font-semibold text-white"> Pour agences, marques et établissements</span>.
            </p>

            {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="relative">
                <input 
                  type="text" 
                placeholder="Rechercher des modèles, créateurs, spécialités, localisations..."
                className="w-full px-6 py-4 md:py-5 text-lg md:text-xl border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 mobile-input shadow-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-slate-900 px-6 py-2 md:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors mobile-btn">
                Rechercher
                  </button>
            </div>
            </div>

            {/* Services Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            <button className="px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors mobile-btn border border-white/20">
              Modèles
            </button>
            <button className="px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors mobile-btn border border-white/20">
              Shootings Photo
            </button>
            <button className="px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors mobile-btn border border-white/20">
              Publicité
            </button>
            <button className="px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors mobile-btn border border-white/20">
              UGC
            </button>
            </div>

            {/* Country Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {countries.map((country) => (
              <button
                key={country}
                className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors mobile-btn border border-white/20"
              >
                    {country}
                  </button>
              ))}
          </div>
        </div>
      </section>

            {/* Section style Apple */}
      <section className="py-4 md:py-8 bg-white">
        <div className="w-full">
          {/* Première section - Modèles */}
          <div data-unit-id="modeles" className="mb-1 md:mb-2 relative">
            <div className="module-content">
              <div className="unit-wrapper relative">
                <Link href="/services/modeles" className="unit-link absolute inset-0 z-10" aria-hidden="true" tabIndex={-1}>&nbsp;</Link>
                <div className="w-full">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-96 md:h-[580px] flex items-center justify-center relative w-full">
                    <div className="text-center text-white">
                      <h3 className="headline text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                        Modèles à disposition.
                      </h3>
                      <p className="subhead text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
                        Des modèles professionnels pour vos shootings et campagnes publicitaires.
                      </p>
                      <div className="cta-links">
                        <Link href="/services/modeles" className="button button-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
                          <span className="icon-copy">En savoir plus</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deuxième section - Créateurs UGC */}
          <div data-unit-id="createurs-ugc" className="mb-1 md:mb-2 relative">
            <div className="module-content">
              <div className="unit-wrapper theme-dark relative">
                <Link href="/services/ugc" className="unit-link absolute inset-0 z-10" aria-hidden="true" tabIndex={-1}>&nbsp;</Link>
                <div className="w-full">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-96 md:h-[580px] flex items-center justify-center relative w-full">
                    <div className="text-center text-white">
                      <h3 className="headline text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                        Créateurs UGC
                      </h3>
                      <p className="subhead text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
                        Des créateurs authentiques pour vos campagnes.
                      </p>
                      <div className="cta-links">
                        <Link href="/services/ugc" className="button button-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
                          En savoir plus
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Troisième section - Publicité */}
          <div data-unit-id="publicite" className="mb-1 md:mb-2 relative">
            <div className="module-content">
              <div className="unit-wrapper relative">
                <Link href="/services/publicite" className="unit-link absolute inset-0 z-10" aria-hidden="true" tabIndex={-1}>&nbsp;</Link>
                <div className="w-full">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-96 md:h-[580px] flex items-center justify-center relative w-full">
                    <div className="text-center text-white">
                      <h3 className="headline text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                        Campagnes publicitaires
                      </h3>
                      <p className="subhead text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
                        Créez des campagnes impactantes avec nos modèles et créateurs.
                      </p>
                      <div className="cta-links">
                        <Link href="/services/publicite" className="button button-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
                          <span className="icon-copy">En savoir plus</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-16 md:py-24 mobile-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Découvrez nos modèles et créateurs
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Une sélection des meilleurs modèles et créateurs vérifiés et testés
            </p>
          </div>
          
          {/* Search Filters */}
          <div className="mb-8 md:mb-12">
        <SearchFilters 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={categories}
            />
          </div>
          
          <PinterestGrid 
            creators={filteredCreators}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </div>
      </section>

      {/* How It Works Section - Apple Style Grid */}
      <section className="py-4 md:py-8 bg-white">
        <div className="w-full">
          {/* Mobile: Stacked layout, Desktop: 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
            {/* Step 1 - Recherchez */}
            <div className="relative">
              <div className="w-full">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-96 md:h-[490px] flex items-center justify-center relative w-full">
                  <div className="text-center text-white">
                    <h3 className="headline text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                      Recherchez
                    </h3>
                    <p className="subhead text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
                      Utilisez nos filtres avancés pour trouver les modèles et créateurs qui correspondent à vos besoins.
                    </p>
                    <div className="cta-links">
                      <Link href="/creators" className="button button-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
                        <span className="icon-copy">Commencer</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Contactez */}
            <div className="relative">
              <div className="w-full">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-96 md:h-[490px] flex items-center justify-center relative w-full">
                  <div className="text-center text-white">
                    <h3 className="headline text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                      Contactez
                    </h3>
                    <p className="subhead text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
                      Envoyez votre brief et négociez directement avec les modèles et créateurs sélectionnés.
                    </p>
                    <div className="cta-links">
                      <Link href="/creators" className="button button-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
                        <span className="icon-copy">Contacter</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Collaborez */}
            <div className="relative">
              <div className="w-full">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-96 md:h-[490px] flex items-center justify-center relative w-full">
                  <div className="text-center text-white">
                    <h3 className="headline text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                      Collaborez
                    </h3>
                    <p className="subhead text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
                      Recevez vos shootings, publicités et contenus UGC authentiques pour booster vos campagnes.
                    </p>
                    <div className="cta-links">
                      <Link href="/creators" className="button button-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
                        <span className="icon-copy">Collaborer</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 - Résultats */}
            <div className="relative">
              <div className="w-full">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-96 md:h-[490px] flex items-center justify-center relative w-full">
                  <div className="text-center text-white">
                    <h3 className="headline text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                      Résultats
                    </h3>
                    <p className="subhead text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
                      Obtenez des résultats exceptionnels avec des campagnes qui convertissent et engagent.
                    </p>
                    <div className="cta-links">
                      <Link href="/creators" className="button button-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
                        <span className="icon-copy">Voir les résultats</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Apple TV+ Style Carousel */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez ce que nos clients disent de notre plateforme
            </p>
          </div>

          {/* Apple TV+ Style Gallery */}
          <div id="testimonials-gallery" className="gallery" aria-label="Galerie Témoignages">
            <h4 className="visuallyhidden">Témoignages Clients</h4>
            
            {/* Gallery Container */}
            <div className="item-container" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)' }}>
              
              {/* Gallery Item 1 */}
              <div id="testimonials-gallery-item-1" className="gallery-item theme-dark current absolute inset-0" role="tabpanel" aria-labelledby="testimonials-gallery-item-1-trigger" style={{ zIndex: 1, opacity: 1, transform: 'translate(0px, 0px)' }}>
                <div className="relative w-full h-[523px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")' }}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="inner">
                      <div className="info-top mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">MC</span>
              </div>
                          <span className="text-white/80 text-sm">Agence Modèles & Créateurs</span>
                        </div>
                      </div>
                      <div className="info-bottom">
                        <div className="custom-button button-primary-light inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 mb-4">
                          Voir le témoignage
                        </div>
                        <p className="typography-shows-genre text-white/90">
                          <span className="genre font-semibold">Directrice Marketing</span> 
                          <span className="m-dot mx-2" aria-hidden="true">·</span> 
                          &ldquo;Grâce à cette plateforme, nous avons trouvé des modèles exceptionnels pour nos shootings publicitaires. La qualité est incroyable !&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

              {/* Gallery Item 2 */}
              <div id="testimonials-gallery-item-2" className="gallery-item theme-dark absolute inset-0" role="tabpanel" aria-labelledby="testimonials-gallery-item-2-trigger" style={{ zIndex: 0, opacity: 1, transform: 'translate(102%, 0px)' }}>
                <div className="relative w-full h-[523px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80")' }}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="inner">
                      <div className="info-top mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">MC</span>
              </div>
                          <span className="text-white/80 text-sm">Agence Modèles & Créateurs</span>
                        </div>
                      </div>
                      <div className="info-bottom">
                        <div className="custom-button button-primary-light inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 mb-4">
                          Voir le témoignage
                        </div>
                        <p className="typography-shows-genre text-white/90">
                          <span className="genre font-semibold">Fondateur TechStart</span> 
                          <span className="m-dot mx-2" aria-hidden="true">·</span> 
                          &ldquo;Première agence française ! Nous avons pu lancer nos campagnes publicitaires avec des modèles parfaitement alignés avec notre marque.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

              {/* Gallery Item 3 */}
              <div id="testimonials-gallery-item-3" className="gallery-item theme-dark absolute inset-0" role="tabpanel" aria-labelledby="testimonials-gallery-item-3-trigger" style={{ zIndex: 0, opacity: 1, transform: 'translate(204%, 0px)' }}>
                <div className="relative w-full h-[523px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="inner">
                      <div className="info-top mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">MC</span>
              </div>
                          <span className="text-white/80 text-sm">Agence Modèles & Créateurs</span>
                        </div>
                      </div>
                      <div className="info-bottom">
                        <div className="custom-button button-primary-light inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 mb-4">
                          Voir le témoignage
                        </div>
                        <p className="typography-shows-genre text-white/90">
                          <span className="genre font-semibold">Responsable Digital</span> 
                          <span className="m-dot mx-2" aria-hidden="true">·</span> 
                          &ldquo;L&rsquo;engagement de nos créateurs UGC est 5x supérieur aux influenceurs traditionnels. ROI exceptionnel !&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
            </div>
          </div>

              {/* Gallery Item 4 */}
              <div id="testimonials-gallery-item-4" className="gallery-item theme-dark absolute inset-0" role="tabpanel" aria-labelledby="testimonials-gallery-item-4-trigger" style={{ zIndex: 0, opacity: 1, transform: 'translate(306%, 0px)' }}>
                <div className="relative w-full h-[523px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="inner">
                      <div className="info-top mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">MC</span>
                          </div>
                          <span className="text-white/80 text-sm">Agence Modèles & Créateurs</span>
                        </div>
                      </div>
                      <div className="info-bottom">
                        <div className="custom-button button-primary-light inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 mb-4">
                          Voir le témoignage
                        </div>
                        <p className="typography-shows-genre text-white/90">
                          <span className="genre font-semibold">CEO FoodTech</span> 
                          <span className="m-dot mx-2" aria-hidden="true">·</span> 
                          &ldquo;La première agence qui comprend vraiment tous nos besoins : modèles, UGC, publicité. Nos campagnes n&rsquo;ont jamais été aussi efficaces !&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="paddlenav paddlenav-framed absolute top-1/2 left-0 right-0 transform -translate-y-1/2 pointer-events-none">
              <ul className="flex justify-between px-4 md:px-8">
                <li className="previous">
                  <button 
                    aria-label="Témoignage précédent" 
                    className="paddlenav-arrow paddlenav-arrow-previous bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 pointer-events-auto"
                    onClick={() => {
                      // Navigation logic here
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
                  </button>
                </li>
                <li className="next">
                  <button 
                    aria-label="Témoignage suivant" 
                    className="paddlenav-arrow paddlenav-arrow-next bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 pointer-events-auto"
                    onClick={() => {
                      // Navigation logic here
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>

            {/* Dots Navigation */}
            <div className="tablist-wrapper absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="dotnav">
                <ul role="tablist" className="dotnav-items flex space-x-2">
                  <li role="presentation" className="current">
                    <a href="#testimonials-gallery-item-1" id="testimonials-gallery-item-1-trigger" aria-label="élément 1" className="dotnav-item current w-3 h-3 rounded-full bg-white/60 hover:bg-white/80 transition-all duration-300" role="tab" aria-controls="testimonials-gallery-item-1" tabIndex={0} aria-selected="true">
                      <span className="visuallyhidden">Item 1</span>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#testimonials-gallery-item-2" id="testimonials-gallery-item-2-trigger" aria-label="élément 2" className="dotnav-item w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300" role="tab" aria-controls="testimonials-gallery-item-2" tabIndex={-1} aria-selected="false">
                      <span className="visuallyhidden">Item 2</span>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#testimonials-gallery-item-3" id="testimonials-gallery-item-3-trigger" aria-label="élément 3" className="dotnav-item w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300" role="tab" aria-controls="testimonials-gallery-item-3" tabIndex={-1} aria-selected="false">
                      <span className="visuallyhidden">Item 3</span>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#testimonials-gallery-item-4" id="testimonials-gallery-item-4-trigger" aria-label="élément 4" className="dotnav-item w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300" role="tab" aria-controls="testimonials-gallery-item-4" tabIndex={-1} aria-selected="false">
                      <span className="visuallyhidden">Item 4</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Play/Pause Button */}
            <button 
              className="tv-plus-gallery-play-pause playing show absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300" 
              aria-label="Mettre en pause la galerie" 
              data-analytics-title="pause-testimonials-gallery"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Section - Why Choose Us */}
      <section className="py-16 md:py-24 mobile-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Première agence française spécialisée dans les modèles, shootings et UGC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Our Advantages */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
                Nos avantages
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Services complets</h4>
                    <p className="text-slate-600">Modèles, shootings, publicité et UGC en une seule plateforme</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Modèles vérifiés</h4>
                    <p className="text-slate-600">Tous nos modèles sont testés et validés</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">ROI garanti</h4>
                    <p className="text-slate-600">Engagement 5x supérieur aux influenceurs traditionnels</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Support dédié</h4>
                    <p className="text-slate-600">Accompagnement personnalisé pour chaque projet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitors */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
                Les autres plateformes
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Services limités</h4>
                    <p className="text-slate-600">Spécialisés dans un seul domaine</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Pas de vérification</h4>
                    <p className="text-slate-600">Modèles non testés, qualité aléatoire</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Engagement faible</h4>
                    <p className="text-slate-600">Contenu générique, peu d&rsquo;authenticité</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Pas d&rsquo;accompagnement</h4>
                    <p className="text-slate-600">Vous êtes livré à vous-même</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-16 md:py-24 mobile-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Plus de 500+ agences, marques et établissements utilisent notre plateforme
            </p>
          </div>
          
          {/* Infinite Scrolling Logos */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              <div className="flex space-x-8 md:space-x-12 items-center">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={`first-${i}`} className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center hover-lift transition-all duration-300 mobile-card">
                      <span className="text-slate-600 font-bold text-lg md:text-xl">M{i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-8 md:space-x-12 items-center ml-8 md:ml-12">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={`second-${i}`} className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center hover-lift transition-all duration-300 mobile-card">
                      <span className="text-slate-600 font-bold text-lg md:text-xl">M{i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
