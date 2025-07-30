"use client";

import { useState, useCallback, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { PortfolioItem } from '../globals/types';

interface UsePortfolioReturn {
  portfolioItems: PortfolioItem[];
  isLoading: boolean;
  error: string | null;
  addToPortfolio: (mediaFileId: string, title: string, description?: string) => Promise<void>;
  removeFromPortfolio: (portfolioItemId: string) => Promise<void>;
  updatePortfolioItem: (portfolioItemId: string, updates: Partial<PortfolioItem>) => Promise<void>;
  toggleFeatured: (portfolioItemId: string) => Promise<void>;
  refreshPortfolio: () => Promise<void>;
}

export function usePortfolio(creatorId?: string): UsePortfolioReturn {
  const supabase = createClient();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ajouter un média au portfolio
  const addToPortfolio = useCallback(async (mediaFileId: string, title: string, description?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('Vous devez être connecté');
      }

      // Récupérer les infos du média
      const { data: mediaFile, error: mediaError } = await supabase
        .from('media_files')
        .select('*')
        .eq('id', mediaFileId)
        .single();

      if (mediaError) throw mediaError;

      // Créer l'item de portfolio
      const { data: portfolioItem, error: portfolioError } = await supabase
        .from('portfolio_items')
        .insert({
          creator_id: session.user.id,
          media_file_id: mediaFileId,
          title,
          description,
          content_type: mediaFile.type === 'video' ? 'video' : 'image',
          media_url: mediaFile.url,
          thumbnail_url: mediaFile.type === 'video' ? null : mediaFile.url,
        })
        .select()
        .single();

      if (portfolioError) throw portfolioError;

      // Marquer le média comme étant dans le portfolio
      await supabase
        .from('media_files')
        .update({ is_portfolio: true })
        .eq('id', mediaFileId);

      // Ajouter à la liste locale
      const newPortfolioItem: PortfolioItem = {
        id: portfolioItem.id,
        creator_id: portfolioItem.creator_id,
        title: portfolioItem.title,
        description: portfolioItem.description,
        media_url: portfolioItem.media_url,
        thumbnail_url: portfolioItem.thumbnail_url,
        category: portfolioItem.category,
        tags: portfolioItem.tags || [],
        views_count: portfolioItem.views_count || 0,
        likes_count: portfolioItem.likes_count || 0,
        is_featured: portfolioItem.is_featured || false,
        created_at: portfolioItem.created_at,
      };

      setPortfolioItems(prev => [newPortfolioItem, ...prev]);

    } catch (error) {
      console.error('Erreur lors de l\'ajout au portfolio:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'ajout au portfolio');
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  // Retirer un item du portfolio
  const removeFromPortfolio = useCallback(async (portfolioItemId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Récupérer l'item pour avoir le media_file_id
      const { data: portfolioItem, error: getError } = await supabase
        .from('portfolio_items')
        .select('media_file_id')
        .eq('id', portfolioItemId)
        .single();

      if (getError) throw getError;

      // Supprimer l'item du portfolio
      const { error: deleteError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', portfolioItemId);

      if (deleteError) throw deleteError;

      // Démarquer le média
      if (portfolioItem.media_file_id) {
        await supabase
          .from('media_files')
          .update({ is_portfolio: false })
          .eq('id', portfolioItem.media_file_id);
      }

      // Mettre à jour la liste locale
      setPortfolioItems(prev => prev.filter(item => item.id !== portfolioItemId));

    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  // Mettre à jour un item du portfolio
  const updatePortfolioItem = useCallback(async (portfolioItemId: string, updates: Partial<PortfolioItem>) => {
    try {
      setError(null);

      const { error } = await supabase
        .from('portfolio_items')
        .update(updates)
        .eq('id', portfolioItemId);

      if (error) throw error;

      // Mettre à jour la liste locale
      setPortfolioItems(prev => prev.map(item =>
        item.id === portfolioItemId ? { ...item, ...updates } : item
      ));

    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour');
    }
  }, [supabase]);

  // Basculer le statut featured
  const toggleFeatured = useCallback(async (portfolioItemId: string) => {
    try {
      const currentItem = portfolioItems.find(item => item.id === portfolioItemId);
      if (!currentItem) return;

      await updatePortfolioItem(portfolioItemId, { is_featured: !currentItem.is_featured });
    } catch (error) {
      console.error('Erreur lors du toggle featured:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors du toggle featured');
    }
  }, [portfolioItems, updatePortfolioItem]);

  // Rafraîchir le portfolio
  const refreshPortfolio = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const targetCreatorId = creatorId || (await supabase.auth.getSession()).data.session?.user?.id;
      if (!targetCreatorId) return;

      const { data: items, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('creator_id', targetCreatorId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const portfolioItems: PortfolioItem[] = items?.map(item => ({
        id: item.id,
        creator_id: item.creator_id,
        title: item.title,
        description: item.description,
        media_url: item.media_url,
        thumbnail_url: item.thumbnail_url,
        category: item.category,
        tags: item.tags || [],
        views_count: item.views_count || 0,
        likes_count: item.likes_count || 0,
        is_featured: item.is_featured || false,
        created_at: item.created_at,
      })) || [];

      setPortfolioItems(portfolioItems);

    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors du rafraîchissement');
    } finally {
      setIsLoading(false);
    }
  }, [supabase, creatorId]);

  // Écouter les changements en temps réel
  useEffect(() => {
    const targetCreatorId = creatorId || supabase.auth.getSession().then(({ data }) => data.session?.user?.id);

    if (!targetCreatorId) return;

    // Charger les données initiales
    refreshPortfolio();

    // Écouter les changements en temps réel
    const channel = supabase
      .channel('portfolio-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_items',
          filter: creatorId ? `creator_id=eq.${creatorId}` : undefined,
        },
        (payload) => {
          console.log('Portfolio change:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newItem: PortfolioItem = {
              id: payload.new.id,
              creator_id: payload.new.creator_id,
              title: payload.new.title,
              description: payload.new.description,
              media_url: payload.new.media_url,
              thumbnail_url: payload.new.thumbnail_url,
              category: payload.new.category,
              tags: payload.new.tags || [],
              views_count: payload.new.views_count || 0,
              likes_count: payload.new.likes_count || 0,
              is_featured: payload.new.is_featured || false,
              created_at: payload.new.created_at,
            };
            
            setPortfolioItems(prev => {
              const exists = prev.some(item => item.id === newItem.id);
              return exists ? prev : [newItem, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            setPortfolioItems(prev => prev.map(item =>
              item.id === payload.new.id ? { ...item, ...payload.new } : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setPortfolioItems(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, creatorId, refreshPortfolio]);

  return {
    portfolioItems,
    isLoading,
    error,
    addToPortfolio,
    removeFromPortfolio,
    updatePortfolioItem,
    toggleFeatured,
    refreshPortfolio,
  };
} 