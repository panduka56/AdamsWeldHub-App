'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { Sun, Moon, Calculator, BookOpen, Wrench, AlertTriangle, Gauge, Bookmark, Package, Scale, ShoppingCart, ChevronDown, X, Menu, Info, Percent } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  name: string
  href: string
  icon: any
  description?: string
}

const toolsItems: NavItem[] = [
  {
    name: 'Gas Calculator',
    href: '/calculator',
    icon: Calculator,
    description: 'Calculate gas requirements and costs'
  },
  {
    name: 'Materials Guide',
    href: '/materials-guide',
    icon: BookOpen,
    description: 'Comprehensive welding materials guide'
  },
  {
    name: 'Troubleshooting',
    href: '/troubleshooting',
    icon: Wrench,
    description: 'Common issues and solutions'
  },
  {
    name: 'Safety Tips',
    href: '/safety-tips',
    icon: AlertTriangle,
    description: 'Essential safety guidelines'
  },
  {
    name: 'Gas Flow Cheat Sheet',
    href: '/gas-flow-chart',
    icon: Gauge,
    description: 'Quick reference for optimal settings'
  },
  {
    name: 'Notes & Bookmarks',
    href: '/notes',
    icon: Bookmark,
    description: 'Save important calculations and notes'
  },
  {
    name: 'Bulk Savings',
    href: '/bulk-savings',
    icon: Calculator,
    description: 'Calculate bulk purchase savings'
  },
  {
    name: 'Calculate Discounts',
    href: '/calculate-discounts',
    icon: Percent,
    description: 'Bulk order discount calculator'
  },
  {
    name: 'Quick Order',
    href: '/quick-order',
    icon: ShoppingCart,
    description: 'Place orders quickly'
  },
]

const productItems: NavItem[] = [
  {
    name: 'Products',
    href: '/products',
    icon: Package,
    description: 'Browse the complete product range'
  },
  {
    name: 'Bulk Savings',
    href: '/bulk-savings',
    icon: Scale,
    description: 'Volume discounts and offers'
  },
  {
    name: 'Calculate Bulk Discounts',
    href: '/bulk-calculator',
    icon: Calculator,
    description: 'Calculate savings for bulk orders'
  },
  {
    name: 'Quick Order',
    href: '/quick-order',
    icon: ShoppingCart,
    description: 'Fast ordering for regular customers'
  }
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="backdrop-blur-xl border-b transition-colors duration-300
                     bg-white/80 dark:bg-[#1E1E1E]/80
                     border-gray-200 dark:border-[#FF8C42]/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-20">
            {/* Left Side - Navigation */}
            <div className="flex-1 hidden md:flex items-center space-x-6">
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium
                                              text-gray-600 dark:text-gray-300 hover:text-gray-900 
                                              dark:hover:text-white">
                  <span>Tools</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {toolsItems.map((item) => (
                    <DropdownMenuItem key={item.name} className="p-2">
                      <Link href={item.href} className="flex items-start space-x-3 w-full">
                        <item.icon className="w-5 h-5 mt-0.5 text-[#FF8C42]" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium
                                              text-gray-600 dark:text-gray-300 hover:text-gray-900 
                                              dark:hover:text-white">
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {productItems.map((item) => (
                    <DropdownMenuItem key={item.name} className="p-2">
                      <Link href={item.href} className="flex items-start space-x-3 w-full">
                        <item.icon className="w-5 h-5 mt-0.5 text-[#FF8C42]" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform 
                              group-hover:scale-105 duration-200">
                  <Image 
                    src="/images/logos/AG_CalcLogo2.svg"
                    alt="Adams WeldHub"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300
                               text-gray-900 dark:text-white">
                  Adams<span className="text-[#e77402]">WeldHub</span>
                </span>
              </Link>
            </div>

            {/* Right Side - Direct Links & Actions */}
            <div className="flex-1 hidden md:flex items-center justify-end space-x-6">
              <Link 
                href="/materials-guide"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 
                         hover:text-gray-900 dark:hover:text-white"
              >
                Materials Guide
              </Link>
              <Link 
                href="/about"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 
                         hover:text-gray-900 dark:hover:text-white"
              >
                About
              </Link>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-[#252525] 
                         hover:bg-gray-200 dark:hover:bg-[#333333] 
                         transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[#e77402]" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 
                         dark:hover:bg-[#252525] transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden border-t border-gray-200 dark:border-[#FF8C42]/20"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="space-y-6">
                  {/* Tools Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Tools
                    </h3>
                    <div className="space-y-2">
                      {toolsItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 p-2 rounded-lg
                                   text-gray-600 dark:text-gray-300
                                   hover:bg-gray-100 dark:hover:bg-[#252525]
                                   transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 text-[#FF8C42]" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Products Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Products
                    </h3>
                    <div className="space-y-2">
                      {productItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 p-2 rounded-lg
                                   text-gray-600 dark:text-gray-300
                                   hover:bg-gray-100 dark:hover:bg-[#252525]
                                   transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 text-[#FF8C42]" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Direct Links */}
                  <div className="space-y-2">
                    <Link
                      href="/materials-guide"
                      className="flex items-center space-x-3 p-2 rounded-lg
                               text-gray-600 dark:text-gray-300
                               hover:bg-gray-100 dark:hover:bg-[#252525]
                               transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen className="w-5 h-5 text-[#FF8C42]" />
                      <span>Materials Guide</span>
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center space-x-3 p-2 rounded-lg
                               text-gray-600 dark:text-gray-300
                               hover:bg-gray-100 dark:hover:bg-[#252525]
                               transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Info className="w-5 h-5 text-[#FF8C42]" />
                      <span>About</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
