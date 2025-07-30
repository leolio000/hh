import Link from "next/link";
import CreatorCard from "@/components/creator-card";
import BrandsCarousel from "@/components/brands-carousel";

export default function BrandsPage() {
  const featuredCreators = [
    {
      id: 1,
      name: "Melinda H.",
      location: "Saint-Raphaël, France",
      rating: 5.0,
      reviews: 50,
      specialties: ["Beauté", "Mode", "Lifestyle"],
      avatar: "M",
      photo: "/creators/melinda.jpg",
      price: "€200-500",
      responseTime: "12h",
      followers: "45K",
      engagement: "8.2"
    },
    {
      id: 2,
      name: "Cindy B.",
      location: "Isère, France", 
      rating: 5.0,
      reviews: 103,
      specialties: ["Famille", "Parenting", "Lifestyle"],
      avatar: "C",
      photo: "/creators/cindy.jpg",
      price: "€150-400",
      responseTime: "8h",
      followers: "32K",
      engagement: "12.5"
    },
    {
      id: 3,
      name: "Yostina K.",
      location: "Paris, France",
      rating: 5.0,
      reviews: 46,
      specialties: ["Beauté", "Mode", "Tech"],
      avatar: "Y",
      photo: "/creators/yostina.jpg",
      price: "€300-800",
      responseTime: "1h",
      followers: "78K",
      engagement: "15.8"
    }
  ];

  const services = [
    {
      title: "Recherche de Créateurs",
      description: "Trouvez les créateurs parfaits pour vos campagnes grâce à nos filtres avancés.",
      icon: "🔍",
      features: ["Filtrage par spécialité", "Recherche géolocalisée", "Analyse des performances"]
    },
    {
      title: "Gestion de Projets",
      description: "Gérez vos campagnes UGC de A à Z avec nos outils intégrés.",
      icon: "📊",
      features: ["Briefing automatisé", "Suivi en temps réel", "Validation des contenus"]
    },
    {
      title: "Paiements Sécurisés",
      description: "Effectuez vos paiements en toute sécurité via notre plateforme.",
      icon: "💳",
      features: ["Paiements sécurisés", "Facturation automatique", "Suivi des dépenses"]
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "Directrice Marketing, Yves Rocher",
      quote: "Cette plateforme nous a permis de trouver des créateurs authentiques qui correspondent parfaitement à notre image de marque.",
      avatar: "M"
    },
    {
      name: "Thomas Martin",
      company: "CEO, Deezer",
      quote: "La qualité du contenu UGC que nous recevons est exceptionnelle. ROI garanti sur nos campagnes.",
      avatar: "T"
    },
    {
      name: "Sophie Bernard",
      company: "Responsable Communication, La Redoute",
      quote: "Processus simple et efficace. Nos campagnes UGC n'ont jamais été aussi performantes.",
      avatar: "S"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 md:mb-8">
            Trouvez les Créateurs UGC
            <br />
            <span className="font-medium">Parfaits pour Votre Marque</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Connectez-vous avec des créateurs authentiques qui vont transformer vos campagnes marketing 
            et booster votre ROI.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher un créateur, spécialité ou secteur d'activité..."
                className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
              />
              <button className="absolute right-2 top-2 bg-slate-800 text-white px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-slate-700 transition-all duration-200 text-sm md:text-base">
                Rechercher
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">5,099+</div>
              <div className="text-white/80 text-xs md:text-sm">Créateurs vérifiés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">98%</div>
              <div className="text-white/80 text-xs md:text-sm">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">24h</div>
              <div className="text-white/80 text-xs md:text-sm">Temps de réponse</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6">
              Nos Services pour Marques
            </h2>
                          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Une suite complète d&apos;outils pour optimiser vos campagnes UGC et maximiser votre ROI.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-8 hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl mb-4 md:mb-6">{service.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6">
              Créateurs Vedettes
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos créateurs les plus demandés par les marques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/creators">
              <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm md:text-base">
                Voir tous les créateurs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Brands Carousel */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6">
              Marques qui nous font confiance
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rejoignez les milliers de marques qui font confiance à notre plateforme.
            </p>
          </div>
          <BrandsCarousel brands={[
            { id: 1, name: "Deezer", logo: "/brands/deezer.svg", category: "Music" },
            { id: 2, name: "Yves Rocher", logo: "/brands/yves-rocher.svg", category: "Beauty" },
            { id: 3, name: "Caisse d'Épargne", logo: "/brands/caisse-epargne.svg", category: "Finance" },
            { id: 4, name: "Publicis", logo: "/brands/publicis.svg", category: "Advertising" },
            { id: 5, name: "La Redoute", logo: "/brands/la-redoute.svg", category: "Home" },
            { id: 6, name: "Soshape", logo: "/brands/soshape.svg", category: "Fashion" },
            { id: 7, name: "Datashake", logo: "/brands/datashake.svg", category: "Tech" },
            { id: 8, name: "Loora", logo: "/brands/loora.svg", category: "Beauty" },
            { id: 9, name: "Caats", logo: "/brands/caats.svg", category: "Tech" },
            { id: 10, name: "TBWA", logo: "/brands/tbwa.svg", category: "Advertising" },
            { id: 11, name: "Castorama", logo: "/brands/castorama.svg", category: "Home" }
          ]} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              En 3 étapes simples, trouvez et collaborez avec les créateurs UGC parfaits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {[
              {
                step: "1",
                title: "Recherchez",
                description: "Utilisez nos filtres avancés pour trouver les créateurs qui correspondent à vos besoins.",
                icon: "🔍"
              },
              {
                step: "2",
                title: "Contactez",
                description: "Envoyez votre brief et négociez directement avec les créateurs sélectionnés.",
                icon: "💬"
              },
              {
                step: "3",
                title: "Collaborez",
                description: "Recevez votre contenu UGC authentique et boostez vos campagnes marketing.",
                icon: "🚀"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <span className="text-white font-bold text-xl md:text-2xl">{item.step}</span>
                </div>
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-16 md:mb-20 text-gray-900">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl hover-lift apple-shadow">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <span className="text-white font-medium text-lg md:text-xl">{testimonial.avatar}</span>
                </div>
                <p className="text-gray-600 italic mb-4 md:mb-6 text-center leading-relaxed text-sm md:text-base">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="text-center">
                  <p className="text-gray-900 font-medium text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs md:text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6">
              Tarifs Transparents
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pas de frais cachés. Payez uniquement pour les créateurs que vous engagez.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Starter",
                price: "Gratuit",
                description: "Parfait pour commencer",
                features: ["Accès aux créateurs", "Recherche de base", "Contact direct", "5 projets/mois"]
              },
              {
                name: "Pro",
                price: "€99/mois",
                description: "Pour les marques en croissance",
                features: ["Tout de Starter", "Recherche avancée", "Gestion de projets", "Analytics", "Support prioritaire"]
              },
              {
                name: "Enterprise",
                price: "Sur mesure",
                description: "Pour les grandes marques",
                features: ["Tout de Pro", "API personnalisée", "Dédié manager", "Formation équipe", "SLA garanti"]
              }
            ].map((plan, index) => (
              <div key={index} className={`rounded-2xl md:rounded-3xl p-6 md:p-8 ${index === 1 ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' : 'bg-gray-50'}`}>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-2xl md:text-3xl font-bold mb-2">{plan.price}</div>
                <p className={`mb-4 md:mb-6 text-sm md:text-base ${index === 1 ? 'text-white/80' : 'text-gray-600'}`}>{plan.description}</p>
                <ul className="space-y-2 md:space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs md:text-sm">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 md:mt-8 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${
                  index === 1 
                    ? 'bg-white text-purple-600 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                }`}>
                  Commencer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 md:mb-8 text-white">
            Prêt à transformer vos campagnes ?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 leading-relaxed">
            Rejoignez les milliers de marques qui font confiance à notre plateforme 
            pour leurs campagnes UGC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link href="/register">
              <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 text-sm md:text-base">
                Créer mon compte gratuit
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 text-sm md:text-base">
                Parler à un expert
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 