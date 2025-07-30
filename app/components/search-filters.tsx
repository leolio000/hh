"use client";

import { useState } from "react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

interface FilterState {
  category: string;
  location: string;
  rating: string;
}

export default function SearchFilters({ onSearch, onFilterChange, categories }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    location: "",
    rating: ""
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm mobile-card">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Search Bar - Style professionnel amélioré */}
        <form onSubmit={handleSearch} className="mb-4 md:mb-6">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 md:h-6 md:w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher des créateurs, spécialités, localisations..."
              className="block w-full pl-12 pr-4 py-3 md:py-4 border border-gray-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent text-base md:text-lg bg-white/90 backdrop-blur-sm mobile-input shadow-sm hover:shadow-md transition-shadow duration-200"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Filter Toggle - Style professionnel amélioré */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-700 hover:text-gray-900 transition-colors mobile-btn bg-gray-50/90 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/90 hover:shadow-sm"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            <span className="font-medium">Filtres avancés</span>
            <svg className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${isFiltersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-500 font-medium">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>5,099+ créateurs</span>
          </div>
        </div>

        {/* Filters Panel - Style professionnel amélioré */}
        {isFiltersOpen && (
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="block text-sm md:text-base font-semibold text-gray-700">Catégorie</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent text-sm md:text-base mobile-input bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="block text-sm md:text-base font-semibold text-gray-700">Localisation</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent text-sm md:text-base mobile-input bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <option value="">Toutes les localisations</option>
                  <option value="paris">Paris</option>
                  <option value="lyon">Lyon</option>
                  <option value="marseille">Marseille</option>
                  <option value="bordeaux">Bordeaux</option>
                  <option value="toulouse">Toulouse</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <label className="block text-sm md:text-base font-semibold text-gray-700">Note minimum</label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent text-sm md:text-base mobile-input bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <option value="">Toutes les notes</option>
                  <option value="4.5">4.5+ étoiles</option>
                  <option value="4.0">4.0+ étoiles</option>
                  <option value="3.5">3.5+ étoiles</option>
                </select>
              </div>
            </div>

            {/* Active Filters - Style amélioré */}
            {(filters.category || filters.location || filters.rating) && (
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm md:text-base text-gray-600 font-medium">Filtres actifs:</span>
                  {filters.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700 font-medium border border-slate-200/50 hover:bg-slate-200/70 transition-colors">
                      {filters.category}
                      <button
                        onClick={() => handleFilterChange("category", "")}
                        className="ml-2 hover:text-slate-900 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.location && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700 font-medium border border-slate-200/50 hover:bg-slate-200/70 transition-colors">
                      {filters.location}
                      <button
                        onClick={() => handleFilterChange("location", "")}
                        className="ml-2 hover:text-slate-900 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.rating && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700 font-medium border border-slate-200/50 hover:bg-slate-200/70 transition-colors">
                      {filters.rating}
                      <button
                        onClick={() => handleFilterChange("rating", "")}
                        className="ml-2 hover:text-slate-900 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setFilters({ category: "", location: "", rating: "" });
                      onFilterChange({ category: "", location: "", rating: "" });
                    }}
                    className="text-sm md:text-base text-slate-600 hover:text-slate-900 underline font-medium transition-colors"
                  >
                    Effacer tous les filtres
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 