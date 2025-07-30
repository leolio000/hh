"use client";

import { useState, useEffect } from "react";

interface Brand {
  id: number;
  name: string;
  logo: string;
  category: string;
}

interface BrandsCarouselProps {
  brands?: Brand[];
}

export default function BrandsCarousel({ brands }: BrandsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultBrands: Brand[] = [
    { id: 1, name: "Nike", logo: "/brands/nike.svg", category: "Sport" },
    { id: 2, name: "Adidas", logo: "/brands/adidas.svg", category: "Sport" },
    { id: 3, name: "Apple", logo: "/brands/apple.svg", category: "Tech" },
    { id: 4, name: "Samsung", logo: "/brands/samsung.svg", category: "Tech" },
    { id: 5, name: "Coca-Cola", logo: "/brands/coca-cola.svg", category: "Beverages" },
    { id: 6, name: "Pepsi", logo: "/brands/pepsi.svg", category: "Beverages" },
    { id: 7, name: "McDonald's", logo: "/brands/mcdonalds.svg", category: "Food" },
    { id: 8, name: "KFC", logo: "/brands/kfc.svg", category: "Food" },
    { id: 9, name: "Starbucks", logo: "/brands/starbucks.svg", category: "Beverages" },
    { id: 10, name: "Dunkin'", logo: "/brands/dunkin.svg", category: "Food" },
    { id: 11, name: "Netflix", logo: "/brands/netflix.svg", category: "Entertainment" },
    { id: 12, name: "Disney", logo: "/brands/disney.svg", category: "Entertainment" },
    { id: 13, name: "Amazon", logo: "/brands/amazon.svg", category: "E-commerce" },
    { id: 14, name: "Walmart", logo: "/brands/walmart.svg", category: "Retail" },
    { id: 15, name: "Target", logo: "/brands/target.svg", category: "Retail" },
    { id: 16, name: "Best Buy", logo: "/brands/best-buy.svg", category: "Electronics" },
    { id: 17, name: "Home Depot", logo: "/brands/home-depot.svg", category: "Home Improvement" },
    { id: 18, name: "Lowe's", logo: "/brands/lowes.svg", category: "Home Improvement" }
  ];

  const displayBrands = brands || defaultBrands;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === displayBrands.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [displayBrands.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === displayBrands.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayBrands.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
            Marques qui nous font confiance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plus de 500+ marques nous font confiance pour leurs campagnes UGC
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {displayBrands.map((brand, index) => (
              <div
                key={brand.id}
                className={`bg-gray-50 rounded-xl p-4 flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 ${
                  index === currentIndex ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-gray-600 font-bold text-sm">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium text-xs">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6">
            {displayBrands.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full mx-1 transition-all duration-200 ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Auto-scroll Animation */}
        <div className="mt-8 relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-8 md:gap-12 flex-shrink-0">
                {displayBrands.map((brand, brandIndex) => (
                  <div 
                    key={`${index}-${brandIndex}`}
                    className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center hover-lift transition-all duration-300 min-w-[120px] md:min-w-[160px] hover:bg-gray-100 hover:scale-105"
                  >
                    <span className="text-gray-600 font-medium text-center text-xs md:text-sm whitespace-nowrap">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 