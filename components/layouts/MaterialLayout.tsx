'use client'

import { motion } from 'framer-motion'
import { Thermometer, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

interface MaterialLayoutProps {
  material: {
    id: string;
    name: string;
    description: string;
    properties: {
      meltingPoint: string;
      thermalConductivity: string;
      strength: string;
    };
    applications: string[];
    considerations: string[];
    compatibleGases: string[];
  }
}

export default function MaterialLayout({ material }: MaterialLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/materials"
          className="inline-flex items-center space-x-2 text-[#FF8C42] mb-8
                     hover:text-[#FFA366] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Materials</span>
        </Link>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 
                     shadow-lg border border-gray-200 dark:border-[#FF8C42]/20"
        >
          <h1 className={`${outfit.className} text-4xl font-[350] text-gray-800 
                         dark:text-white mb-4 tracking-[-0.02em]`}>
            {material.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {material.description}
          </p>

          {/* Properties Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-xl 
                           border border-gray-200 dark:border-[#FF8C42]/20">
              <div className="flex items-center text-[#FF8C42] mb-2">
                <Thermometer className="w-5 h-5 mr-2" />
                <span>Melting Point</span>
              </div>
              <div className="text-gray-800 dark:text-white font-medium">
                {material.properties.meltingPoint}
              </div>
            </div>
            {/* ... other property cards ... */}
          </div>

          {/* Compatible Gases */}
          <div className="mb-8">
            <h2 className="text-2xl font-[350] text-gray-800 dark:text-white mb-4">
              Compatible Gases
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {material.compatibleGases.map((gas, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-[#252525] rounded-xl
                             border border-gray-200 dark:border-[#FF8C42]/20
                             text-gray-800 dark:text-white"
                >
                  {gas}
                </div>
              ))}
            </div>
          </div>

          {/* Applications & Considerations */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-[350] text-gray-800 dark:text-white mb-4">
                Applications
              </h2>
              <ul className="space-y-2">
                {material.applications.map((app, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-[#FF8C42] rounded-full mr-3" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-[350] text-gray-800 dark:text-white mb-4">
                Considerations
              </h2>
              <ul className="space-y-2">
                {material.considerations.map((con, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-[#FF8C42] rounded-full mr-3" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 