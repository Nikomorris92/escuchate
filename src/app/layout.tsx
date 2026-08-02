import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.css'
import AdminButton from '@/components/AdminButton'

export const metadata: Metadata = {
  title: 'Escúchate',
  description: 'Un espacio de reflexión diaria para escucharte y actuar.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div style={{ position: 'fixed', top: '0.75rem', right: '0.75rem', zIndex: 50 }}>
          <Image src="/logo-v4.png" alt="Escúchate" width={90} height={90} style={{ objectFit: 'contain', display: 'block' }} />
        </div>
        {children}
        <AdminButton />
      </body>
    </html>
  )
}
