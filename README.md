# Créateurs UGC France - Première Agence UGC Française

Plateforme de mise en relation entre marques et créateurs UGC (User Generated Content) en France.

## 🚀 Fonctionnalités

### Sections principales
- **Hero Section** avec recherche animée
- **Section Créateurs** avec filtres avancés
- **Section "Comment ça marche"** améliorée
- **Section Testimonials** avec avis clients
- **Section Comparatif** "Pourquoi nous choisir"
- **Section Influenceurs Internationaux** avec réseau mondial
- **Blog** avec ressources externes UGC
- **Page À propos** avec équipe et mission
- **Page Contact** avec formulaire

### Optimisations SEO
- Métadonnées optimisées pour chaque page
- Sitemap.xml dynamique
- Robots.txt configuré
- Schema.org structured data
- Open Graph et Twitter Cards
- Manifest.json pour PWA

## 🛠️ Installation

1. **Cloner le projet**
   ```bash
git clone [repository-url]
cd vv
   ```

2. **Installer les dépendances**
   ```bash
npm install
```

3. **Configuration Supabase (optionnel)**
Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Lancer le serveur de développement**
   ```bash
npm run dev
```

## 📁 Structure du projet

```
vv/
├── app/
│   ├── components/          # Composants réutilisables
│   ├── auth/               # Pages d'authentification
│   ├── creators/           # Page des créateurs
│   ├── blog/              # Blog avec ressources externes
│   ├── about/             # Page À propos
│   ├── contact/           # Page Contact
│   └── layout.tsx         # Layout principal avec SEO
├── public/
│   ├── robots.txt         # Configuration robots
│   └── manifest.json      # Manifest PWA
└── lib/
    └── supabase/          # Configuration Supabase
```

## 🎨 Technologies utilisées

- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Supabase** pour l'authentification (optionnel)
- **React Hooks** pour la gestion d'état

## 🔧 Configuration

### Variables d'environnement
```env
# Supabase (optionnel)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Créateurs UGC France"
```

### Images
Les images des créateurs sont gérées avec des placeholders automatiques en cas d'erreur 404.

## 📱 Responsive Design

Le site est entièrement responsive avec :
- Design mobile-first
- Breakpoints optimisés
- Animations fluides
- Navigation adaptative

## 🚀 Déploiement

### Vercel (recommandé)
   ```bash
npm run build
vercel --prod
```

### Autres plateformes
Le projet est compatible avec toutes les plateformes supportant Next.js.

## 📊 SEO Optimisé

- Métadonnées complètes
- Sitemap automatique
- Structured data (Schema.org)
- Open Graph et Twitter Cards
- Performance optimisée
- Core Web Vitals

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour toute question ou support, contactez-nous via la page Contact du site.

---

**Créateurs UGC France** - Première agence française spécialisée dans l'UGC