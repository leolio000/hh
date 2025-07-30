"use client";

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { MediaFile } from '../globals/types';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, ACCEPTED_VIDEO_TYPES } from '../globals/constants';

interface UseMediaUploadReturn {
  mediaFiles: MediaFile[];
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  uploadFiles: (files: FileList) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  updateFileCategory: (fileId: string, category: string) => Promise<void>;
  updateFileTags: (fileId: string, tags: string[]) => Promise<void>;
  refreshMediaFiles: () => Promise<void>;
}

export function useMediaUpload(): UseMediaUploadReturn {
  const supabase = createClient();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Valider un fichier
  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `Le fichier ${file.name} est trop volumineux (max 10MB)`;
    }

    const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
    const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return `Le type de fichier ${file.type} n'est pas supporté`;
    }

    return null;
  };

  // Uploader des fichiers
  const uploadFiles = useCallback(async (files: FileList) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('Vous devez être connecté pour uploader des fichiers');
      }

      const fileArray = Array.from(files);
      const totalFiles = fileArray.length;
      let uploadedFiles = 0;

      for (const file of fileArray) {
        // Valider le fichier
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          continue;
        }

        // Générer un nom unique pour le fichier
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        // Uploader vers Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw uploadError;
        }

        // Obtenir l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // Enregistrer en base de données
        const { data: mediaFile, error: dbError } = await supabase
          .from('media_files')
          .insert({
            user_id: session.user.id,
            name: file.name,
            type: file.type.startsWith('video/') ? 'video' : 'image',
            url: publicUrl,
            size_bytes: file.size,
          })
          .select()
          .single();

        if (dbError) {
          throw dbError;
        }

        // Ajouter à la liste locale
        const newMediaFile: MediaFile = {
          id: mediaFile.id,
          name: mediaFile.name,
          type: mediaFile.type as 'image' | 'video',
          url: mediaFile.url,
          uploaded_at: mediaFile.created_at,
          size: mediaFile.size_bytes,
          category: mediaFile.category,
          tags: mediaFile.tags || [],
        };

        setMediaFiles(prev => [...prev, newMediaFile]);

        uploadedFiles++;
        setUploadProgress((uploadedFiles / totalFiles) * 100);
      }

    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'upload');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [supabase]);

  // Supprimer un fichier
  const deleteFile = useCallback(async (fileId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('Vous devez être connecté');
      }

      // Trouver le fichier
      const fileToDelete = mediaFiles.find(f => f.id === fileId);
      if (!fileToDelete) {
        throw new Error('Fichier non trouvé');
      }

      // Extraire le chemin du fichier depuis l'URL
      const urlParts = fileToDelete.url.split('/');
      const filePath = `${session.user.id}/${urlParts[urlParts.length - 1]}`;

      // Supprimer du storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filePath]);

      if (storageError) {
        throw storageError;
      }

      // Supprimer de la base de données
      const { error: dbError } = await supabase
        .from('media_files')
        .delete()
        .eq('id', fileId);

      if (dbError) {
        throw dbError;
      }

      // Mettre à jour la liste locale
      setMediaFiles(prev => prev.filter(f => f.id !== fileId));

    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la suppression');
    }
  }, [supabase, mediaFiles]);

  // Mettre à jour la catégorie d'un fichier
  const updateFileCategory = useCallback(async (fileId: string, category: string) => {
    try {
      const { error } = await supabase
        .from('media_files')
        .update({ category })
        .eq('id', fileId);

      if (error) throw error;

      // Mettre à jour la liste locale
      setMediaFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, category } : f
      ));

    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour');
    }
  }, [supabase]);

  // Mettre à jour les tags d'un fichier
  const updateFileTags = useCallback(async (fileId: string, tags: string[]) => {
    try {
      const { error } = await supabase
        .from('media_files')
        .update({ tags })
        .eq('id', fileId);

      if (error) throw error;

      // Mettre à jour la liste locale
      setMediaFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, tags } : f
      ));

    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour');
    }
  }, [supabase]);

  // Rafraîchir la liste des fichiers
  const refreshMediaFiles = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data: files, error } = await supabase
        .from('media_files')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mediaFiles: MediaFile[] = files?.map(file => ({
        id: file.id,
        name: file.name,
        type: file.type as 'image' | 'video',
        url: file.url,
        uploaded_at: file.created_at,
        size: file.size_bytes,
        category: file.category,
        tags: file.tags || [],
      })) || [];

      setMediaFiles(mediaFiles);

    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors du rafraîchissement');
    }
  }, [supabase]);

  return {
    mediaFiles,
    isUploading,
    uploadProgress,
    error,
    uploadFiles,
    deleteFile,
    updateFileCategory,
    updateFileTags,
    refreshMediaFiles,
  };
} 