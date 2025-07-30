import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Services',
  description: 'Découvrez tous nos services : modèles professionnels, shootings photo, campagnes publicitaires et créateurs UGC authentiques.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
} 