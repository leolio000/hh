// Constantes globales pour l'application

export const CATEGORIES = [
  "Beauté", "Mode", "Lifestyle", "Famille", "Parenting", "Tech", 
  "Gaming", "Fitness", "Nutrition", "Sport", "Aventure", "Voyage",
  "Art", "Business", "Food", "Travel"
];

export const COUNTRIES = [
  "États-Unis", "France", "Espagne", "Italie", "Canada", "Belgique"
];

export const ANIMATED_TEXTS = [
  "vos campagnes publicitaires.",
  "vos shootings photo.",
  "vos contenus UGC.",
  "vos événements.",
  "votre communication."
];

export const SERVICES = {
  MODELES: 'modeles',
  SHOOTINGS: 'shootings',
  PUBLICITE: 'publicite',
  UGC: 'ugc'
} as const;

export const USER_ROLES = {
  CREATOR: 'creator',
  BRAND: 'brand',
  ADMIN: 'admin'
} as const;

export const PROJECT_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video'
} as const;

export const GENDER_OPTIONS = [
  "Homme", "Femme", "Non-binaire", "Autre"
];

export const SHOOTING_TYPES = [
  "Solo", "Couple", "Famille", "Groupe", "Amis", "Parent"
];

export const LANGUAGES = [
  "Français", "Anglais", "Espagnol", "Italien", "Allemand", "Portugais"
];

export const EQUIPMENT = [
  "Appareil photo professionnel",
  "Éclairage studio",
  "Trépieds",
  "Objectifs variés",
  "Matériel vidéo",
  "Drone",
  "Stabilisateur"
];

export const SOCIAL_PLATFORMS = [
  "Instagram", "TikTok", "YouTube", "Facebook", "Twitter", "LinkedIn"
];

export const RATING_LABELS = [
  { value: "4.5", label: "4.5+ étoiles" },
  { value: "4.0", label: "4.0+ étoiles" },
  { value: "3.5", label: "3.5+ étoiles" },
  { value: "3.0", label: "3.0+ étoiles" }
];

export const PRICE_RANGES = [
  { min: 0, max: 500, label: "0€ - 500€" },
  { min: 500, max: 1000, label: "500€ - 1000€" },
  { min: 1000, max: 2000, label: "1000€ - 2000€" },
  { min: 2000, max: 5000, label: "2000€ - 5000€" },
  { min: 5000, max: 999999, label: "5000€+" }
];

export const RESPONSE_TIME_OPTIONS = [
  { value: 1, label: "Moins d'1 heure" },
  { value: 2, label: "2-4 heures" },
  { value: 8, label: "8-12 heures" },
  { value: 24, label: "1 jour" },
  { value: 48, label: "2 jours" }
];

export const PORTFOLIO_CATEGORIES = [
  "Mode", "Beauté", "Lifestyle", "Portrait", "Sport", "Événementiel", "Corporate", "Autre"
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/mov', 'video/avi'];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50
};

export const SEARCH_DEBOUNCE_MS = 300;

export const API_ENDPOINTS = {
  CREATORS: '/api/creators',
  PROJECTS: '/api/projects',
  MEDIA: '/api/media',
  PORTFOLIO: '/api/portfolio',
  SERVICES: '/api/services',
  ANALYTICS: '/api/analytics'
} as const; 