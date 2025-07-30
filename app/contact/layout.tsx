import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Première Agence UGC Française | Créateurs UGC France',
  description: 'Contactez notre équipe d\'experts UGC. Prêt à booster vos campagnes marketing ? Notre équipe est là pour vous accompagner dans vos projets UGC.',
  keywords: [
    'contact UGC',
    'agence UGC contact',
    'devis UGC',
    'projet UGC',
    'campagne marketing UGC',
    'créateurs UGC',
    'conseil UGC',
    'stratégie UGC'
  ],
  openGraph: {
    title: 'Contact - Première Agence UGC Française',
    description: 'Contactez notre équipe d\'experts UGC. Prêt à booster vos campagnes marketing ?',
    type: 'website',
    url: 'https://createurs-ugc-france.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Première Agence UGC Française',
    description: 'Contactez notre équipe d\'experts UGC. Prêt à booster vos campagnes marketing ?',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 