import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Créateurs UGC - User Generated Content',
  description: 'Créateurs UGC authentiques pour vos campagnes. Contenu généré par les utilisateurs avec un ROI 5x supérieur.',
}

export default function UGCPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8">
            Créateurs UGC
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Nos créateurs UGC authentiques génèrent du contenu qui convertit. 
            ROI 5x supérieur aux campagnes traditionnelles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/creators" 
              className="px-8 py-4 bg-white text-cyan-700 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Voir nos créateurs UGC
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Lancer une campagne
            </Link>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que l'UGC */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-8">
                Qu&apos;est-ce que l&apos;UGC ?
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                L&apos;User Generated Content (UGC) est du contenu créé par de vrais utilisateurs 
                qui partagent leur expérience authentique avec vos produits ou services.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Authenticité</h3>
                    <p className="text-slate-600">Contenu créé par de vrais utilisateurs, plus crédible que la publicité traditionnelle.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Performance</h3>
                    <p className="text-slate-600">Taux d&apos;engagement et de conversion significativement supérieurs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Rentabilité</h3>
                    <p className="text-slate-600">Coût de production inférieur pour des résultats supérieurs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">Statistiques UGC</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl font-bold text-teal-600 mb-2">5x</div>
                    <div className="text-sm text-slate-600">Plus d&apos;engagement</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-teal-600 mb-2">92%</div>
                    <div className="text-sm text-slate-600">Font confiance à l&apos;UGC</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-teal-600 mb-2">-50%</div>
                    <div className="text-sm text-slate-600">Coût de production</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-teal-600 mb-2">+28%</div>
                    <div className="text-sm text-slate-600">Taux de conversion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de Contenu UGC */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Types de Contenu UGC
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nos créateurs produisent du contenu varié adapté à vos besoins et plateformes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Unboxing */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Unboxing</h3>
              <p className="text-sm text-slate-600">
                Déballage authentique de vos produits avec réactions spontanées.
              </p>
            </div>

            {/* Tutoriels */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Tutoriels</h3>
              <p className="text-sm text-slate-600">
                Guides d&apos;utilisation et démonstrations pratiques de vos produits.
              </p>
            </div>

            {/* Avis */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Avis & Reviews</h3>
              <p className="text-sm text-slate-600">
                Retours d&apos;expérience honnêtes et détaillés sur vos produits.
              </p>
            </div>

            {/* Lifestyle */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Lifestyle</h3>
              <p className="text-sm text-slate-600">
                Intégration naturelle de vos produits dans le quotidien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Créateurs UGC */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Nos Créateurs UGC
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sélectionnés pour leur authenticité et leur capacité à créer du contenu engageant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Micro-Influenceurs */}
            <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Micro-Influenceurs</h3>
              <p className="text-slate-600 mb-6">
                1K à 100K followers, engagement très élevé et communauté fidèle.
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div>• Taux d&apos;engagement élevé</div>
                <div>• Communauté engagée</div>
                <div>• Coût accessible</div>
                <div>• Authenticité maximale</div>
              </div>
            </div>

            {/* Nano-Influenceurs */}
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl">
              <div className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Nano-Influenceurs</h3>
              <p className="text-slate-600 mb-6">
                Moins de 10K followers, proximité maximale avec leur audience.
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div>• Proximité avec l&apos;audience</div>
                <div>• Contenu très authentique</div>
                <div>• Recommandations crédibles</div>
                <div>• ROI exceptionnel</div>
              </div>
            </div>

            {/* Créateurs de Niche */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Experts de Niche</h3>
              <p className="text-slate-600 mb-6">
                Spécialisés dans des domaines précis avec une expertise reconnue.
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div>• Expertise sectorielle</div>
                <div>• Audience qualifiée</div>
                <div>• Crédibilité technique</div>
                <div>• Influence d&apos;achat forte</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8">
            Prêt à lancer votre campagne UGC ?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Nos créateurs UGC vous attendent pour créer du contenu authentique 
            qui convertit vos prospects en clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-teal-700 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Lancer ma campagne UGC
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