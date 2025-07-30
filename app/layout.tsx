import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navigation from './components/navigation'
import { AppProvider } from './globals/providers'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Agence Modèles & Créateurs France - Première Agence Française | Modèles, Shootings, Publicité, UGC',
    template: '%s | Agence Modèles & Créateurs France'
  },
  description: 'Première agence française spécialisée dans les modèles, shootings photo, publicité et UGC. Pour agences, marques et établissements. Trouvez les meilleurs modèles et créateurs pour vos campagnes.',
  keywords: [
    'modèles photo',
    'shootings photo',
    'agence modèles',
    'créateurs UGC',
    'publicité modèles',
    'agence France',
    'première agence française',
    'modèles vérifiés',
    'campagnes publicitaires',
    'shootings professionnels',
    'UGC créateurs',
    'marketing modèles',
    'agences marques',
    'établissements modèles',
    'ROI publicité'
  ],
  authors: [{ name: 'Créateurs UGC France' }],
  creator: 'Créateurs UGC France',
  publisher: 'Créateurs UGC France',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://createurs-ugc-france.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://agence-modeles-createurs-france.com',
    title: 'Agence Modèles & Créateurs France - Première Agence Française',
    description: 'Première agence française spécialisée dans les modèles, shootings photo, publicité et UGC. Pour agences, marques et établissements.',
    siteName: 'Agence Modèles & Créateurs France',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Créateurs UGC France - Première Agence UGC Française',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agence Modèles & Créateurs France - Première Agence Française',
    description: 'Première agence française spécialisée dans les modèles, shootings photo, publicité et UGC. Pour agences, marques et établissements.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'marketing',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Agence Modèles & Créateurs France",
              "url": "https://agence-modeles-createurs-france.com",
              "logo": "https://agence-modeles-createurs-france.com/logo.png",
              "description": "Première agence française spécialisée dans les modèles, shootings photo, publicité et UGC. Pour agences, marques et établissements.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "French"
              },
              "sameAs": [
                "https://www.linkedin.com/company/createurs-ugc-france",
                "https://www.instagram.com/createurs_ugc_france",
                "https://www.tiktok.com/@createurs_ugc_france"
              ]
            })
          }}
        />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Agence Modèles & Créateurs France",
              "description": "Première agence française spécialisée dans les modèles, shootings photo, publicité et UGC",
              "url": "https://agence-modeles-createurs-france.com",
              "telephone": "+33-1-XX-XX-XX-XX",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressLocality": "Paris"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "48.8566",
                "longitude": "2.3522"
              },
              "openingHours": "Mo-Fr 09:00-18:00",
              "priceRange": "€€",
              "serviceArea": {
                "@type": "Country",
                "name": "France"
              }
            })
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
