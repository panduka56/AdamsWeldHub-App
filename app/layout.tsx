import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Inter, Outfit } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Metadata } from 'next'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://adamsgas.com'),
  title: {
    default: 'AdamsGas | Professional Welding Supplies & Resources',
    template: '%s | AdamsGas'
  },
  description: 'Professional welding supplies, gas calculators, and expert resources for welders. Find MIG, TIG, and Oxy-Fuel gases, safety guides, and troubleshooting tips.',
  keywords: ['welding gas', 'MIG welding', 'TIG welding', 'welding supplies', 'gas calculator', 'welding safety'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adamsgas.com',
    siteName: 'AdamsGas',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'AdamsGas - Professional Welding Supplies'
    }]
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      </head>
      <body className={`${inter.className} antialiased transition-colors duration-300
        bg-gray-50 dark:bg-[#111111]
        text-gray-900 dark:text-white min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="flex-grow pt-20">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
