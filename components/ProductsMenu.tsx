'use client'

import { Calculator, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

interface ProductMenuItem {
  id: string
  title: string
  description: string
  icon: React.ElementType
  href: string
}

const menuItems: ProductMenuItem[] = [
  {
    id: 'bulk-savings',
    title: 'Bulk Savings',
    description: 'Calculate bulk purchase savings',
    icon: Calculator,
    href: '/products/bulk-savings'
  },
  {
    id: 'discounts',
    title: 'Calculate Discounts',
    description: 'Bulk order discount calculator',
    icon: Calculator,
    href: '/products/discounts'
  },
  {
    id: 'quick-order',
    title: 'Quick Order',
    description: 'Place orders quickly',
    icon: ShoppingCart,
    href: '/products/quick-order'
  }
]

export default function ProductsMenu() {
  return (
    <>
      {menuItems.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="border-l-4 border-l-purple-500">
            <Link
              href={item.href}
              className="block p-4 bg-[#252525] rounded-xl border border-[#FF8C42]/20 
                       hover:bg-[#FF8C42]/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#2A2A2A] rounded-lg">
                  <item.icon className="w-6 h-6 text-[#FF8C42]" />
                </div>
                <div>
                  <h3 className="text-lg font-[350] text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            </Link>
          </Card>
        </motion.div>
      ))}
    </>
  )
} 