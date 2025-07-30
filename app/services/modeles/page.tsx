import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Modèles Professionnels',
  description: 'Découvrez notre sélection de modèles professionnels vérifiés pour vos shootings photo et campagnes publicitaires.',
}

export default function ModelesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8">
            Modèles Professionnels
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Une sélection rigoureuse de modèles professionnels vérifiés et testés, 
            prêts pour vos shootings photo et campagnes publicitaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/creators" 
              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Voir tous les modèles
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Nos Types de Modèles
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Chaque modèle est soigneusement sélectionné et vérifié pour garantir 
              la qualité de vos productions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Modèles Mode */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Modèles Mode</h3>
              <p className="text-slate-600 mb-6">
                Spécialisés dans la mode, le prêt-à-porter et les accessoires. 
                Expérience confirmée en studio et en extérieur.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Portfolio mode professionnel</li>
                <li>• Expérience défilés et shootings</li>
                <li>• Tailles standards et grandes tailles</li>
              </ul>
            </div>

            {/* Modèles Beauté */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Modèles Beauté</h3>
              <p className="text-slate-600 mb-6">
                Experts en cosmétiques, soins et beauté. Peau parfaite et 
                expressions naturelles pour vos campagnes beauté.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Spécialisés cosmétiques et soins</li>
                <li>• Peau et cheveux exceptionnels</li>
                <li>• Expérience macro et close-up</li>
              </ul>
            </div>

            {/* Modèles Lifestyle */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Modèles Lifestyle</h3>
              <p className="text-slate-600 mb-6">
                Parfaits pour les scènes de vie quotidienne, famille, sport et 
                bien-être. Naturels et authentiques.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Scènes de vie authentiques</li>
                <li>• Familles et couples</li>
                <li>• Sport et bien-être</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 mb-6">
              Notre Processus de Sélection
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Chaque modèle passe par un processus de sélection rigoureux pour 
              garantir la qualité de nos prestations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Candidature</h3>
              <p className="text-slate-600">
                Les modèles soumettent leur book et leurs expériences professionnelles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Évaluation</h3>
              <p className="text-slate-600">
                Notre équipe évalue le potentiel, l&apos;expérience et la polyvalence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Test Shooting</h3>
              <p className="text-slate-600">
                Séance photo test pour valider les compétences et l&apos;aisance devant l&apos;objectif.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Validation</h3>
              <p className="text-slate-600">
                Intégration dans notre agence avec suivi personnalisé et formations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8">
            Prêt à travailler avec nos modèles ?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Contactez-nous pour discuter de votre projet et trouver les modèles parfaits 
            pour votre campagne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/creators" 
              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Parcourir les modèles
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 