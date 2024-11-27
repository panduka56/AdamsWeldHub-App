import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Inter, Outfit } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adams WeldHub - Professional Welding Gas Solutions',
  description: 'Your central hub for welding gas solutions, calculators, and resources',
  icons: {
    icon: [
      { url: '/icons/favicon.ico' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-icon.png' },
    ],
  }
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
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
