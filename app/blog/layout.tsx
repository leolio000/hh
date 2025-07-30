import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog UGC - Conseils et Tendances Marketing | Créateurs UGC France',
  description: 'Découvrez les dernières tendances UGC, conseils marketing et stratégies pour optimiser vos campagnes de contenu généré par les utilisateurs.',
  keywords: [
    'blog UGC',
    'conseils marketing UGC',
    'tendances UGC 2024',
    'stratégies UGC',
    'contenu généré utilisateurs',
    'marketing digital',
    'influence marketing',
    'social media marketing'
  ],
  openGraph: {
    title: 'Blog UGC - Conseils et Tendances Marketing',
    description: 'Découvrez les dernières tendances UGC, conseils marketing et stratégies pour optimiser vos campagnes de contenu généré par les utilisateurs.',
    type: 'website',
    url: 'https://createurs-ugc-france.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog UGC - Conseils et Tendances Marketing',
    description: 'Découvrez les dernières tendances UGC, conseils marketing et stratégies pour optimiser vos campagnes de contenu généré par les utilisateurs.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 