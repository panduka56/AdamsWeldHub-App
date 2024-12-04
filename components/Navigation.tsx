"use client"

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Sun, Moon, Package, Calculator, Cylinder, Wrench, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
  active?: boolean
}

export default function Navigation() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const navigation: NavigationItem[] = [
    {
      name: 'Calculator',
      href: '/calculator',
      icon: Calculator,
      active: false
    },
    {
      name: 'Products',
      href: '/products',
      icon: Cylinder,
      active: false
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: Package,
      active: false
    },
    {
      name: 'Support',
      href: '/support',
      icon: Wrench,
      active: false
    }
  ]

  return (
    <nav className="backdrop-blur-xl border-b transition-colors duration-300
                    bg-white/80 dark:bg-[#1E1E1E]/80
                    border-gray-200 dark:border-[#FF8C42]/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Primary Nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                {!logoError ? (
                  <Image 
                    src="/images/logos/AG_CalcLogo2.svg"
                    alt="Adams WeldHub"
                    fill
                    className="object-contain"
                    priority
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <Cylinder className="w-full h-full text-[#e77402]" />
                )}
              </div>
              <span className="font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300
                             text-gray-900 dark:text-white">
                Adams<span className="text-[#e77402]">WeldHub</span>
              </span>
            </Link>
            <div className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                    flex items-center gap-2
                    ${item.active 
                      ? 'bg-[#e77402]/10 text-[#e77402] border border-[#e77402]/20' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252525]'
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-[#252525] 
                     hover:bg-gray-200 dark:hover:bg-[#333333] 
                     transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#e77402]" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

