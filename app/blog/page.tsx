"use client";

import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  external?: boolean;
  externalUrl?: string;
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Comment l&rsquo;UGC révolutionne le marketing en 2024",
      excerpt: "Découvrez pourquoi le contenu généré par les utilisateurs devient la stratégie marketing la plus efficace pour les marques.",
      author: "Équipe Créateurs UGC France",
      date: "2024-01-15",
      category: "Marketing UGC",
      readTime: "5 min",
      image: "/blog/ugc-marketing-2024.jpg"
    },
    {
      id: 2,
      title: "Les meilleures pratiques pour créer du contenu UGC authentique",
      excerpt: "Guide complet pour créer du contenu UGC qui engage et convertit votre audience.",
      author: "Marie Dubois",
      date: "2024-01-10",
      category: "Conseils UGC",
      readTime: "7 min",
      image: "/blog/best-practices-ugc.jpg"
    },
    {
      id: 3,
      title: "UGC vs Influence Marketing : Quelle stratégie choisir ?",
      excerpt: "Comparaison détaillée entre l&rsquo;UGC et l&rsquo;influence marketing traditionnel pour optimiser votre ROI.",
      author: "Thomas Martin",
      date: "2024-01-05",
      category: "Comparaison",
      readTime: "8 min",
      image: "/blog/ugc-vs-influence.jpg"
    },
    {
      id: 4,
      title: "Comment mesurer le succès de vos campagnes UGC",
      excerpt: "Métriques clés et KPIs pour évaluer l&rsquo;efficacité de vos campagnes de contenu généré par les utilisateurs.",
      author: "Sophie Laurent",
      date: "2024-01-01",
      category: "Analytics",
      readTime: "6 min",
      image: "/blog/ugc-metrics.jpg"
    },
    {
      id: 5,
      title: "L'avenir de l'UGC : Tendances 2024 et au-delà",
      excerpt: "Prédictions et tendances émergentes dans le monde du contenu généré par les utilisateurs.",
      author: "Pierre Moreau",
      date: "2023-12-28",
      category: "Tendances",
      readTime: "9 min",
      image: "/blog/ugc-trends-2024.jpg"
    },
    {
      id: 6,
      title: "Comment intégrer l'UGC dans votre stratégie marketing globale",
      excerpt: "Guide stratégique pour intégrer efficacement l'UGC dans vos campagnes marketing existantes.",
      author: "Julie M.",
      date: "2023-12-25",
      category: "Stratégie",
      readTime: "10 min",
      image: "/blog/ugc-strategy.jpg"
    }
  ];

  const externalResources = [
    {
      title: "Guide complet de l'UGC par HubSpot",
      description: "Le guide ultime pour comprendre et implémenter l'UGC dans votre stratégie marketing.",
      url: "https://blog.hubspot.com/marketing/user-generated-content",
      source: "HubSpot",
      category: "Guide"
    },
    {
      title: "Tendances UGC 2024 par Social Media Today",
      description: "Les dernières tendances et innovations dans le domaine du contenu généré par les utilisateurs.",
      url: "https://www.socialmediatoday.com/news/ugc-trends-2024/",
      source: "Social Media Today",
      category: "Tendances"
    },
    {
      title: "ROI de l'UGC par Marketing Week",
      description: "Étude approfondie sur le retour sur investissement des campagnes UGC.",
      url: "https://www.marketingweek.com/ugc-roi-study-2024/",
      source: "Marketing Week",
      category: "Étude"
    },
    {
      title: "Meilleures pratiques UGC par Content Marketing Institute",
      description: "Les meilleures pratiques pour créer et gérer des campagnes UGC efficaces.",
      url: "https://contentmarketinginstitute.com/ugc-best-practices/",
      source: "Content Marketing Institute",
      category: "Conseils"
    },
    {
      title: "UGC et e-commerce par Shopify",
      description: "Comment l'UGC transforme l'expérience d'achat en ligne.",
      url: "https://www.shopify.com/blog/ugc-ecommerce",
      source: "Shopify",
      category: "E-commerce"
    },
    {
      title: "Législation UGC par Legal Marketing",
      description: "Aspects légaux et réglementaires du contenu généré par les utilisateurs.",
      url: "https://www.legalmarketing.com/ugc-legal-guide/",
      source: "Legal Marketing",
      category: "Légal"
    }
  ];

  const categories = [
    "Tous",
    "Marketing UGC",
    "Conseils UGC",
    "Comparaison",
    "Analytics",
    "Tendances",
    "Stratégie"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 md:mb-8">
            Blog UGC
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Découvrez les dernières tendances, conseils et stratégies pour optimiser vos campagnes UGC
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Nos articles
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Expertise et insights sur l&rsquo;UGC et le marketing digital
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 md:px-6 py-2 md:py-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow mobile-card">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-2xl flex items-center justify-center">
                  <span className="text-slate-600 font-bold text-lg">Image</span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                      {post.category}
                    </span>
                    <span className="text-slate-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{post.author}</p>
                      <p className="text-slate-500 text-sm">{new Date(post.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-slate-900 font-semibold hover:text-slate-700 transition-colors"
                    >
                      Lire plus
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Ressources externes
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez les meilleures ressources UGC du web
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {externalResources.map((resource, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow mobile-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded-full">
                    {resource.category}
                  </span>
                  <span className="text-slate-500 text-sm">{resource.source}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4 leading-tight">
                  {resource.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-900 font-semibold hover:text-slate-700 transition-colors"
                >
                  Lire l&rsquo;article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white mb-4 md:mb-6">
            Restez informé
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto">
            Recevez nos derniers articles et conseils UGC directement dans votre boîte mail
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Votre email"
                className="flex-1 px-6 py-4 text-lg border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors">
                S&rsquo;abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 