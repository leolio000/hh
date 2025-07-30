import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shootings Photo Professionnels',
  description: 'Services de shootings photo professionnels avec nos modèles experts. Studio, extérieur, mode, beauté, lifestyle.',
}

export default function ShootingsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8">
            Shootings Photo Professionnels
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Des shootings photo d&apos;exception avec nos modèles professionnels. 
            Studio, extérieur, mode, beauté, lifestyle - nous réalisons votre vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-purple-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Réserver un shooting
            </Link>
            <Link 
              href="/portfolio" 
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Voir notre portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Types de Shootings */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Types de Shootings
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nous adaptons chaque shooting à vos besoins spécifiques et à votre vision créative.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Studio */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-64 flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow">
                <svg className="w-20 h-20 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Shootings Studio</h3>
              <p className="text-slate-600 mb-6">
                Environnement contrôlé avec éclairage professionnel. Parfait pour la mode, 
                la beauté et les portraits corporate.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Éclairage professionnel modulable</li>
                <li>• Fonds et décors variés</li>
                <li>• Conditions optimales</li>
                <li>• Post-production incluse</li>
              </ul>
            </div>

            {/* Extérieur */}
            <div className="group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 h-64 flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow">
                <svg className="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Shootings Extérieur</h3>
              <p className="text-slate-600 mb-6">
                Lumière naturelle et décors authentiques. Idéal pour le lifestyle, 
                le sport et les campagnes outdoor.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Lumière naturelle optimisée</li>
                <li>• Lieux iconiques et variés</li>
                <li>• Ambiances authentiques</li>
                <li>• Flexibilité créative</li>
              </ul>
            </div>

            {/* Mode */}
            <div className="group">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-8 h-64 flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow">
                <svg className="w-20 h-20 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Shootings Mode</h3>
              <p className="text-slate-600 mb-6">
                Mise en valeur de vos collections avec nos modèles spécialisés mode. 
                Créativité et professionnalisme.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Modèles mode expérimentés</li>
                <li>• Direction artistique</li>
                <li>• Stylisme professionnel</li>
                <li>• Retouche haute couture</li>
              </ul>
            </div>

            {/* Produit */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-64 flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow">
                <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Shootings Produit</h3>
              <p className="text-slate-600 mb-6">
                Mise en scène de vos produits avec nos modèles. Parfait pour 
                l&apos;e-commerce et les campagnes publicitaires.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Mise en situation naturelle</li>
                <li>• Modèles adaptés au produit</li>
                <li>• Formats e-commerce optimisés</li>
                <li>• Variantes et angles multiples</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Notre Processus
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              De la conception à la livraison, nous vous accompagnons à chaque étape 
              pour des résultats exceptionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Brief</h3>
              <p className="text-sm text-slate-600">
                Définition de vos objectifs et de votre vision créative.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Casting</h3>
              <p className="text-sm text-slate-600">
                Sélection des modèles parfaits pour votre projet.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Préparation</h3>
              <p className="text-sm text-slate-600">
                Organisation logistique et technique du shooting.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibent text-slate-900 mb-3">Shooting</h3>
              <p className="text-sm text-slate-600">
                Réalisation avec notre équipe de professionnels.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-white">5</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Livraison</h3>
              <p className="text-sm text-slate-600">
                Post-production et livraison des images finales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-purple-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8">
            Prêt pour votre shooting ?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-purple-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Demander un devis
            </Link>
            <Link 
              href="/creators" 
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Voir nos modèles
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 