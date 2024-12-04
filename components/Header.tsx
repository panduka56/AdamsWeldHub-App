'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { Calculator, Settings, FileText, AlertTriangle, Shield, LineChart, BookText, Package, Percent, ShoppingCart, Mail, Sun, Moon, Menu, X } from 'lucide-react'
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
  icon?: React.ComponentType<{ className?: string }>
  description?: string
}

// Tools menu items
const toolsNavigation: NavItem[] = [
  { 
    name: 'Gas Calculator', 
    href: '/',
    icon: Calculator,
    description: 'Calculate gas requirements and costs'
  },
  { 
    name: 'Materials Guide', 
    href: '/materials-guide',
    icon: FileText,
    description: 'Comprehensive material properties and compatibility'
  },
  { 
    name: 'Troubleshooting', 
    href: '/troubleshooting',
    icon: AlertTriangle,
    description: 'Solutions for common welding issues'
  },
  { 
    name: 'Safety Tips', 
    href: '/safety-tips',
    icon: Shield,
    description: 'Essential safety guidelines'
  },
  { 
    name: 'Gas Flow Chart', 
    href: '/gas-flow-chart',
    icon: LineChart,
    description: 'Quick reference for gas flow settings'
  },
  { 
    name: 'Notes', 
    href: '/notes',
    icon: BookText,
    description: 'Save calculations and important information'
  }
]

// Products menu items
const productNavigation: NavItem[] = [
  { 
    name: 'All Products', 
    href: '/products',
    icon: Package,
    description: 'Browse our complete product range'
  },
  { 
    name: 'Bulk Savings', 
    href: '/products/bulk-savings',
    icon: Percent,
    description: 'Calculate volume discounts'
  },
  { 
    name: 'Quick Order', 
    href: '/products/quick-order',
    icon: ShoppingCart,
    description: 'Fast reordering for regular customers'
  }
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTheme('dark')
  }, [setTheme])

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
                  <Settings className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {toolsNavigation.map((item) => (
                    <DropdownMenuItem key={item.name} className="p-2">
                      <Link href={item.href} className="flex items-start space-x-3 w-full">
                        {item.icon && <item.icon className="w-5 h-5 mt-0.5 text-[#FF8C42]" />}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          )}
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
                  <Settings className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {productNavigation.map((item) => (
                    <DropdownMenuItem key={item.name} className="p-2">
                      <Link href={item.href} className="flex items-start space-x-3 w-full">
                        {item.icon && <item.icon className="w-5 h-5 mt-0.5 text-[#FF8C42]" />}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          )}
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

            {/* Right Side - Contact, Theme Toggle & Mobile Menu */}
            <div className="flex-1 flex items-center justify-end space-x-6">
              <Link
                href="mailto:sales@adamsgas.co.uk"
                className="hidden md:flex items-center space-x-2 text-sm font-medium
                          text-gray-600 dark:text-gray-300 hover:text-gray-900 
                          dark:hover:text-white"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
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
                      {toolsNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 p-2 rounded-lg
                                   text-gray-600 dark:text-gray-300
                                   hover:bg-gray-100 dark:hover:bg-[#252525]
                                   transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.icon && <item.icon className="w-5 h-5 text-[#FF8C42]" />}
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
                      {productNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 p-2 rounded-lg
                                   text-gray-600 dark:text-gray-300
                                   hover:bg-gray-100 dark:hover:bg-[#252525]
                                   transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.icon && <item.icon className="w-5 h-5 text-[#FF8C42]" />}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
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
