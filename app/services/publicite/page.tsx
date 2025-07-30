import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Campagnes Publicitaires',
  description: 'Créez des campagnes publicitaires impactantes avec nos modèles et créateurs professionnels. ROI garanti.',
}

export default function PublicitePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-red-700 py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8">
            Campagnes Publicitaires
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Créez des campagnes publicitaires qui marquent les esprits avec nos modèles 
            et créateurs professionnels. ROI exceptionnel garanti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-red-700 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Lancer une campagne
            </Link>
            <Link 
              href="/creators" 
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Voir nos créateurs
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Pourquoi Choisir Nos Campagnes ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nos campagnes publicitaires génèrent un engagement 5x supérieur 
              aux campagnes traditionnelles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ROI Garanti */}
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">ROI Garanti</h3>
              <p className="text-slate-600 mb-4">
                Nos campagnes génèrent en moyenne 5x plus d&apos;engagement 
                que les campagnes traditionnelles.
              </p>
              <div className="text-3xl font-bold text-green-600">+500%</div>
                              <div className="text-sm text-slate-500">d&apos;engagement moyen</div>
            </div>

            {/* Authenticité */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Authenticité</h3>
              <p className="text-slate-600 mb-4">
                Nos modèles et créateurs apportent une authenticité 
                qui résonne avec votre audience.
              </p>
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-slate-500">de confiance consommateur</div>
            </div>

            {/* Créativité */}
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Créativité</h3>
              <p className="text-slate-600 mb-4">
                Concepts créatifs innovants qui se démarquent 
                dans un environnement saturé.
              </p>
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-slate-500">concepts sur-mesure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de Campagnes */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Types de Campagnes
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nous adaptons chaque campagne à vos objectifs et à votre audience cible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Digital */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Campagnes Digitales</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Réseaux sociaux, display, vidéo online - optimisées pour 
                la performance et l&apos;engagement digital.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Social Media (Instagram, TikTok, Facebook)
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Display et bannières web
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Vidéos courtes et reels
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  E-commerce et marketplaces
                </li>
              </ul>
            </div>

            {/* Traditionnelle */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Campagnes Traditionnelles</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Print, affichage, TV, radio - pour une couverture maximale 
                et un impact durable sur votre marché.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Affichage urbain et transport
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Presse et magazines
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Spots TV et radio
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  PLV et supports point de vente
                </li>
              </ul>
            </div>

            {/* Événementielle */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Campagnes Événementielles</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Salons, lancements produit, pop-up stores - créez l&apos;événement 
                avec nos modèles et hôtesses.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Salons et foires professionnelles
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lancements de produits
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pop-up stores et activations
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Événements corporate
                </li>
              </ul>
            </div>

            {/* Influence */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Marketing d&apos;Influence</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Collaborations avec nos créateurs influenceurs pour 
                toucher votre audience de manière authentique.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Micro et macro influenceurs
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Contenu authentique et engageant
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Campagnes multi-créateurs
                </li>
                <li className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Suivi performance en temps réel
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8">
            Lancez votre campagne maintenant
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Obtenez des résultats exceptionnels avec nos campagnes sur-mesure. 
            Devis gratuit sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-red-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Devis gratuit
            </Link>
            <Link 
              href="/creators" 
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Découvrir nos créateurs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 