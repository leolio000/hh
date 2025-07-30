"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Creator, FilterState, User, AppState } from './types';

// Context pour l'état global
const AppContext = createContext<{
  state: AppState;
  actions: {
    setCreators: (creators: Creator[]) => void;
    setFilteredCreators: (creators: Creator[]) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: FilterState) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    searchCreators: (query: string) => void;
    filterCreators: (filters: FilterState) => void;
    loadMoreCreators: () => void;
    refreshCreators: () => void;
  };
} | null>(null);

// Hook pour utiliser le context
export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}

// Provider principal
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const supabase = createClient();
  
  // État global
  const [state, setState] = useState<AppState>({
    creators: [],
    filteredCreators: [],
    searchQuery: '',
    filters: {},
    user: null,
    loading: true,
    error: null,
  });

  // Actions pour modifier l'état
  const setCreators = useCallback((creators: Creator[]) => {
    setState(prev => ({ ...prev, creators }));
  }, []);

  const setFilteredCreators = useCallback((filteredCreators: Creator[]) => {
    setState(prev => ({ ...prev, filteredCreators }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setState(prev => ({ ...prev, searchQuery }));
  }, []);

  const setFilters = useCallback((filters: FilterState) => {
    setState(prev => ({ ...prev, filters }));
  }, []);

  const setUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, user }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  // Fonction de recherche
  const searchCreators = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredCreators(state.creators);
      return;
    }

    const filtered = state.creators.filter(creator =>
      creator.name.toLowerCase().includes(query.toLowerCase()) ||
      creator.location.toLowerCase().includes(query.toLowerCase()) ||
      creator.specialties.some(specialty => 
        specialty.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    setFilteredCreators(filtered);
  }, [state.creators, setSearchQuery, setFilteredCreators]);

  // Fonction de filtrage
  const filterCreators = useCallback((filters: FilterState) => {
    setFilters(filters);
    
    let filtered = state.creators;

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

    if (filters.gender) {
      filtered = filtered.filter(creator => creator.gender === filters.gender);
    }

    if (filters.shootingType && filters.shootingType.length > 0) {
      filtered = filtered.filter(creator =>
        filters.shootingType!.some(type => creator.shootingType.includes(type))
      );
    }

    // Appliquer aussi la recherche si elle existe
    if (state.searchQuery.trim()) {
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        creator.location.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        creator.specialties.some(specialty => 
          specialty.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      );
    }

    setFilteredCreators(filtered);
  }, [state.creators, state.searchQuery, setFilters, setFilteredCreators]);

  // Charger plus de créateurs (pagination)
  const loadMoreCreators = useCallback(async () => {
    setLoading(true);
    try {
      // Ici on ferait appel à l'API Supabase pour charger plus de données
      // Pour l'instant, on simule avec les données existantes
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch {
      setError('Erreur lors du chargement des créateurs');
      setLoading(false);
    }
  }, [setLoading, setError]);

  // Rafraîchir la liste des créateurs
  const refreshCreators = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Charger les créateurs depuis Supabase
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'creator')
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (error) throw error;

      // Transformer les données en format Creator
      const creators: Creator[] = profiles?.map(profile => ({
        id: parseInt(profile.id),
        name: profile.full_name || 'Créateur',
        location: profile.location || 'France',
        rating: profile.rating || 0,
        reviews: profile.total_reviews || 0,
        specialties: [], // À charger depuis creator_specialties
        avatar: profile.full_name?.charAt(0) || 'C',
        photo: profile.avatar_url || '/default-avatar.jpg',
        responseTime: `${profile.response_time_hours || 24}h`,
        followers: '0K',
        engagement: '0.0',
        gender: profile.gender || 'Non spécifié',
        shootingType: [], // À charger depuis creator_shooting_types
      })) || [];

      setCreators(creators);
      setFilteredCreators(creators);
    } catch {
      console.error('Erreur lors du chargement des créateurs');
      setError('Impossible de charger les créateurs');
    } finally {
      setLoading(false);
    }
  }, [supabase, setCreators, setFilteredCreators, setLoading, setError]);

  // Charger l'utilisateur actuel
  const loadUser = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
            role: profile.role || 'creator',
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'utilisateur:', error);
    }
  }, [supabase, setUser]);

  // Écouter les changements en temps réel
  useEffect(() => {
    // Charger les données initiales
    loadUser();
    refreshCreators();

    // Écouter les changements sur les profils
    const profilesChannel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: 'role=eq.creator',
        },
        () => {
          // Rafraîchir les créateurs quand il y a des changements
          refreshCreators();
        }
      )
      .subscribe();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    // Cleanup
    return () => {
      profilesChannel.unsubscribe();
      subscription.unsubscribe();
    };
  }, [supabase, loadUser, refreshCreators, setUser]);

  // Actions disponibles
  const actions = {
    setCreators,
    setFilteredCreators,
    setSearchQuery,
    setFilters,
    setUser,
    setLoading,
    setError,
    searchCreators,
    filterCreators,
    loadMoreCreators,
    refreshCreators,
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook spécialisé pour les créateurs
export function useCreators() {
  const { state, actions } = useAppState();
  
  return {
    creators: state.creators,
    filteredCreators: state.filteredCreators,
    loading: state.loading,
    error: state.error,
    searchCreators: actions.searchCreators,
    filterCreators: actions.filterCreators,
    loadMoreCreators: actions.loadMoreCreators,
    refreshCreators: actions.refreshCreators,
  };
}

// Hook spécialisé pour la recherche
export function useSearch() {
  const { state, actions } = useAppState();
  
  return {
    searchQuery: state.searchQuery,
    filters: state.filters,
    searchCreators: actions.searchCreators,
    filterCreators: actions.filterCreators,
    setFilters: actions.setFilters,
  };
}

// Hook spécialisé pour l'authentification
export function useAuth() {
  const { state, actions } = useAppState();
  
  return {
    user: state.user,
    loading: state.loading,
    setUser: actions.setUser,
  };
} 