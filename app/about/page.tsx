"use client";

import Link from "next/link";

export default function AboutPage() {
  const stats = [
    {
      number: "500+",
      label: "Marques satisfaites",
      description: "Plus de 500 marques nous font confiance"
    },
    {
      number: "1000+",
      label: "Créateurs vérifiés",
      description: "Créateurs UGC testés et validés"
    },
    {
      number: "5x",
      label: "Engagement supérieur",
      description: "Par rapport aux influenceurs traditionnels"
    },
    {
      number: "48h",
      label: "Délai de livraison",
      description: "Contenu livré en moins de 48h"
    }
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "CEO & Fondatrice",
      bio: "15 ans d&rsquo;expérience dans le marketing digital et l&rsquo;UGC. Passionnée par l&rsquo;authenticité du contenu.",
      avatar: "M"
    },
    {
      name: "Thomas Martin",
      role: "Directeur Marketing",
      bio: "Expert en stratégies UGC et en optimisation du ROI. Spécialiste des campagnes virales.",
      avatar: "T"
    },
    {
      name: "Sophie Laurent",
      role: "Responsable Créateurs",
      bio: "En charge de la sélection et de la formation de nos créateurs UGC. Garante de la qualité.",
      avatar: "S"
    },
    {
      name: "Pierre Moreau",
      role: "Directeur Technique",
      bio: "Expert en plateformes digitales et en optimisation des processus de création de contenu.",
      avatar: "P"
    }
  ];

  const values = [
    {
      title: "Authenticité",
      description: "Nous privilégions le contenu authentique et naturel qui résonne avec les audiences.",
      icon: "🎯"
    },
    {
      title: "Qualité",
      description: "Chaque créateur est soigneusement sélectionné et testé pour garantir l&rsquo;excellence.",
      icon: "⭐"
    },
    {
      title: "Innovation",
      description: "Nous restons à la pointe des tendances UGC pour maximiser votre ROI.",
      icon: "🚀"
    },
    {
      title: "Transparence",
      description: "Processus clair et communication ouverte avec tous nos partenaires.",
      icon: "🔍"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 md:mb-8">
            À propos de nous
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Première agence française spécialisée dans l&rsquo;UGC, nous connectons les meilleurs créateurs aux marques qui veulent se démarquer
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-6 md:mb-8">
                Notre mission
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
                Révolutionner le marketing digital en démocratisant l&rsquo;accès à des créateurs UGC de qualité. Nous croyons que l&rsquo;authenticité et la transparence sont les clés du succès marketing.
              </p>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                En tant que première agence française spécialisée dans l&rsquo;UGC, nous avons développé une expertise unique pour identifier, former et connecter les meilleurs créateurs aux marques qui partagent nos valeurs.
              </p>
              <Link 
                href="/creators" 
                className="inline-flex items-center px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-semibold text-lg md:text-xl hover:bg-slate-800 transition-colors mobile-btn"
              >
                Découvrir nos créateurs
                <svg className="ml-2 w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 md:p-12">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
                <span className="text-slate-600 font-bold text-2xl">Image Mission</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Nos chiffres
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Des résultats qui parlent d&rsquo;eux-mêmes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-slate-600 text-sm md:text-base">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Nos valeurs
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Les principes qui guident notre action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 md:mb-6">
              Notre équipe
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Des experts passionnés par l&rsquo;UGC et le marketing digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl md:text-2xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-slate-600 mb-4">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white mb-4 md:mb-6">
            Prêt à booster vos campagnes ?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto">
            Rejoignez plus de 500 marques qui nous font confiance pour leurs campagnes UGC
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/creators" 
              className="inline-flex items-center px-8 md:px-12 py-4 md:py-5 bg-white text-slate-900 rounded-2xl font-semibold text-lg md:text-xl hover:bg-gray-100 transition-colors mobile-btn"
            >
              Découvrir nos créateurs
              <svg className="ml-2 w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 md:px-12 py-4 md:py-5 bg-transparent text-white border-2 border-white rounded-2xl font-semibold text-lg md:text-xl hover:bg-white hover:text-slate-900 transition-colors mobile-btn"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 