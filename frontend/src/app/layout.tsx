'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import CatalogBar from '@/components/layout/CatalogBar'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <html lang="ru">
      <head>
        <title>Elements KZ - Интернет-магазин электроники</title>
        <meta name="description" content="Онлайн магазин техники, компьютеров, аксессуаров и принтеров в Казахстане" />
      </head>
      <body className={inter.className}>
        <Toaster position="top-right" />
        {!isAdminRoute && (
          <>
            <Header />
            <CatalogBar />
          </>
        )}
        <main className={isAdminRoute ? '' : 'min-h-screen'}>
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  )
}
