import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos - Première Agence UGC Française | Créateurs UGC France',
  description: 'Découvrez notre équipe, notre mission et notre expertise en tant que première agence française spécialisée dans l\'UGC. Plus de 500 marques nous font confiance.',
  keywords: [
    'agence UGC France',
    'première agence UGC française',
    'équipe UGC',
    'mission UGC',
    'expertise UGC',
    'créateurs vérifiés',
    'marketing UGC',
    'contenu authentique'
  ],
  openGraph: {
    title: 'À propos - Première Agence UGC Française',
    description: 'Découvrez notre équipe, notre mission et notre expertise en tant que première agence française spécialisée dans l\'UGC.',
    type: 'website',
    url: 'https://createurs-ugc-france.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos - Première Agence UGC Française',
    description: 'Découvrez notre équipe, notre mission et notre expertise en tant que première agence française spécialisée dans l\'UGC.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 