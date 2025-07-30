"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

interface ProfileData {
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

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  uploaded_at: string;
  size?: number;
  category?: string;
  tags?: string[];
}

export default function ProfileManager() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'media' | 'portfolio'>('profile');
  const [uploading, setUploading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'image' | 'video'>('all');
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: "",
    bio: "",
    location: "",
    specialties: [],
    experience: "",
    languages: [],
    equipment: [],
    social_links: {}
  });
  const supabase = createClient();

  const loadProfileData = useCallback(async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        setProfileData({
          full_name: profile.full_name || "",
          bio: profile.bio || "",
          location: profile.location || "",
          specialties: profile.specialties || [],
          experience: profile.experience || "",
          languages: profile.languages || [],
          equipment: profile.equipment || [],
          social_links: profile.social_links || {}
        });
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  }, [supabase]);

  const loadMediaFiles = async () => {
    // Mock data for now - in real app, this would come from Supabase storage
    const mockFiles: MediaFile[] = [
      {
        id: '1',
        name: 'shooting_beaute_naturelle.jpg',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
        uploaded_at: '2024-01-20',
        size: 2400000,
        category: 'Beauté',
        tags: ['portrait', 'naturel', 'studio']
      },
      {
        id: '2',
        name: 'campagne_mode_ete.jpg',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
        uploaded_at: '2024-01-18',
        size: 3200000,
        category: 'Mode',
        tags: ['été', 'extérieur', 'lifestyle']
      },
      {
        id: '3',
        name: 'video_lifestyle_urban.mp4',
        type: 'video',
        url: '/sample-video.mp4',
        uploaded_at: '2024-01-15',
        size: 15600000,
        category: 'Lifestyle',
        tags: ['urbain', 'dynamique', 'street']
      },
      {
        id: '4',
        name: 'portrait_studio_pro.jpg',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
        uploaded_at: '2024-01-12',
        size: 2800000,
        category: 'Portrait',
        tags: ['studio', 'professionnel', 'éclairage']
      },
      {
        id: '5',
        name: 'shooting_fitness_outdoor.jpg',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        uploaded_at: '2024-01-10',
        size: 2100000,
        category: 'Sport',
        tags: ['fitness', 'outdoor', 'action']
      },
      {
        id: '6',
        name: 'video_unboxing_produit.mp4',
        type: 'video',
        url: '/sample-video.mp4',
        uploaded_at: '2024-01-08',
        size: 8900000,
        category: 'UGC',
        tags: ['unboxing', 'produit', 'authentique']
      }
    ];
    setMediaFiles(mockFiles);
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        await loadProfileData(session.user.id);
        await loadMediaFiles();
      }
    };

    getSession();
  }, [supabase.auth, loadProfileData]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user) return;

    setUploading(true);
    try {
      // Mock upload - in real app, this would upload to Supabase storage
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newFile: MediaFile = {
          id: Date.now().toString() + i,
          name: file.name,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          url: URL.createObjectURL(file),
          uploaded_at: new Date().toISOString()
        };
        setMediaFiles(prev => [...prev, newFile]);
      }
      alert('Fichiers uploadés avec succès !');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Erreur lors de l\'upload des fichiers');
    } finally {
      setUploading(false);
    }
  };

  // Filtrer les médias selon le filtre actif
  const filteredMediaFiles = mediaFiles.filter(file => {
    if (mediaFilter === 'all') return true;
    return file.type === mediaFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Accès non autorisé</h1>
        <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Profil
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'media'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Médias
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'portfolio'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Portfolio
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Informations Personnelles</h3>
                  <p className="text-gray-600 mt-1">Modifiez vos informations pour améliorer votre visibilité</p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ville, Pays"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Parlez-nous de vous, votre expérience, vos spécialités..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Années d&rsquo;expérience</label>
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ex: 5 ans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spécialités (séparées par des virgules)</label>
                  <input
                    type="text"
                    value={profileData.specialties.join(', ')}
                    onChange={(e) => setProfileData({...profileData, specialties: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ex: Beauté, Mode, Lifestyle"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Langues (séparées par des virgules)</label>
                  <input
                    type="text"
                    value={profileData.languages.join(', ')}
                    onChange={(e) => setProfileData({...profileData, languages: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ex: Français, Anglais"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Équipement (séparé par des virgules)</label>
                  <input
                    type="text"
                    value={profileData.equipment.join(', ')}
                    onChange={(e) => setProfileData({...profileData, equipment: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ex: iPhone 14 Pro, Canon EOS R6"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Réseaux Sociaux</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <input
                      type="text"
                      value={profileData.social_links.instagram || ''}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        social_links: {...profileData.social_links, instagram: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="@votre_compte"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
                    <input
                      type="text"
                      value={profileData.social_links.tiktok || ''}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        social_links: {...profileData.social_links, tiktok: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="@votre_compte"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                    <input
                      type="text"
                      value={profileData.social_links.youtube || ''}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        social_links: {...profileData.social_links, youtube: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="URL de votre chaîne"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-8">
              {/* Header avec stats */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Gestion des Médias</h3>
                    <p className="text-gray-600 mt-2">Uploadez vos photos et vidéos pour créer un portfolio professionnel</p>
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{mediaFiles.filter(f => f.type === 'image').length} Photos</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{mediaFiles.filter(f => f.type === 'video').length} Vidéos</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">{mediaFiles.length} Total</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <label className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      {uploading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Upload en cours...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Ajouter des médias
                        </div>
                      )}
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    <div className="text-xs text-gray-500 text-center">
                      JPG, PNG, MP4, MOV<br/>Max 10MB par fichier
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone de drag & drop */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg font-medium text-gray-700 mb-2">Glissez-déposez vos fichiers ici</p>
                <p className="text-gray-500 mb-4">ou cliquez pour parcourir vos fichiers</p>
                <label className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Parcourir les fichiers
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Filtres et tri */}
              {mediaFiles.length > 0 && (
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setMediaFilter('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        mediaFilter === 'all' 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Tous ({mediaFiles.length})
                    </button>
                    <button 
                      onClick={() => setMediaFilter('image')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        mediaFilter === 'image' 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Photos ({mediaFiles.filter(f => f.type === 'image').length})
                    </button>
                    <button 
                      onClick={() => setMediaFilter('video')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        mediaFilter === 'video' 
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Vidéos ({mediaFiles.filter(f => f.type === 'video').length})
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Trier par:</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>Plus récent</option>
                      <option>Plus ancien</option>
                      <option>Nom A-Z</option>
                      <option>Nom Z-A</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Grille des médias */}
              {filteredMediaFiles.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {mediaFiles.length === 0 ? (
                    <>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Votre galerie est vide</h4>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">Commencez par uploader vos meilleures photos et vidéos pour créer un portfolio qui vous démarque</p>
                      <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Ajouter vos premiers médias
                        <input
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {mediaFilter === 'image' ? 'Aucune photo trouvée' : 
                         mediaFilter === 'video' ? 'Aucune vidéo trouvée' : 
                         'Aucun média trouvé'}
                      </h4>
                      <p className="text-gray-500 mb-6">
                        {mediaFilter === 'image' ? 'Vous n\'avez pas encore uploadé de photos.' : 
                         mediaFilter === 'video' ? 'Vous n\'avez pas encore uploadé de vidéos.' : 
                         'Aucun média ne correspond à vos critères.'}
                      </p>
                      <button 
                        onClick={() => setMediaFilter('all')}
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                      >
                        Voir tous les médias
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMediaFiles.map((file) => (
                    <div key={file.id} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      {/* Preview */}
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        {file.type === 'video' ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <Image 
                            src={file.url} 
                            alt={file.name}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        )}
                        {/* Fallback icon */}
                        <div className="hidden absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        
                        {/* Type badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            file.type === 'video' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {file.type === 'video' ? 'Vidéo' : 'Photo'}
                          </span>
                        </div>

                        {/* Actions overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex space-x-2">
                              <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
                                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 truncate mb-1">{file.name}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{new Date(file.uploaded_at).toLocaleDateString('fr-FR')}</span>
                          <div className="flex items-center space-x-3">
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                              Modifier
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Conseils */}
              {mediaFiles.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-amber-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">💡 Conseils pour un portfolio réussi</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Utilisez des images haute résolution (minimum 1920x1080)</li>
                        <li>• Variez les angles et les styles pour montrer votre polyvalence</li>
                        <li>• Organisez vos médias par catégories (beauté, mode, lifestyle...)</li>
                        <li>• Ajoutez des vidéos courtes pour dynamiser votre profil</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Votre Portfolio Public</h3>
                <p className="text-gray-600 mb-6">
                  Voici comment votre portfolio apparaît aux marques et clients
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                    Votre Portfolio Personnel
                  </h4>
                  <p className="text-gray-600">
                    Partagez ce lien avec les marques pour présenter votre travail
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="font-semibold text-gray-900">Lien de votre portfolio</h5>
                      <p className="text-sm text-gray-500">Accessible publiquement</p>
                    </div>
                    <Link
                      href={`/portfolio/${user.id}`}
                      target="_blank"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Voir mon portfolio
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-mono break-all">
                      {typeof window !== 'undefined' ? `${window.location.origin}/portfolio/${user.id}` : 'Chargement...'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h6 className="font-semibold text-gray-900">Vues</h6>
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h6 className="font-semibold text-gray-900">Favoris</h6>
                    <p className="text-2xl font-bold text-green-600">89</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h6 className="font-semibold text-gray-900">Messages</h6>
                    <p className="text-2xl font-bold text-purple-600">23</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 