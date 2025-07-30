// Types globaux pour l'application

export interface Creator {
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

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  uploaded_at: string;
  size?: number;
  category?: string;
  tags?: string[];
}

export interface PortfolioItem {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  media_url: string;
  thumbnail_url?: string;
  category?: string;
  tags?: string[];
  views_count: number;
  likes_count: number;
  is_featured: boolean;
  created_at: string;
}

export interface ProfileData {
  full_name: string;
  bio: string;
  location: string;
  specialties: string[];
  experience: string;
  languages: string[];
  equipment: string[];
  social_links: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export interface FilterState {
  category?: string;
  location?: string;
  rating?: string;
  gender?: string;
  shootingType?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface SearchFilters {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

export interface Project {
  id: string;
  brand_id: string;
  creator_id: string;
  service_id?: string;
  title: string;
  description?: string;
  category?: string;
  budget_min?: number;
  budget_max?: number;
  deadline?: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  requirements?: string;
  service_type?: 'modeles' | 'shootings' | 'publicite' | 'ugc';
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: 'modeles' | 'shootings' | 'publicite' | 'ugc';
  base_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatorStats {
  id: string;
  creator_id: string;
  total_projects: number;
  completed_projects: number;
  success_rate: number;
  average_rating: number;
  total_earnings: number;
  profile_views: number;
  portfolio_views: number;
  last_active: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'creator' | 'brand' | 'admin';
}

export interface AppState {
  creators: Creator[];
  filteredCreators: Creator[];
  searchQuery: string;
  filters: FilterState;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Props types for components
export interface CreatorCardProps {
  creator: Creator;
}

export interface PinterestGridProps {
  creators: Creator[];
  onLoadMore: () => void;
  hasMore: boolean;
} 