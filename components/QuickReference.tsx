'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Search, Eye } from 'lucide-react'
import { Outfit } from 'next/font/google'
import Image from 'next/image'

const outfit = Outfit({ subsets: ['latin'] })

interface ReferenceSheet {
  id: string;
  title: string;
  description: string;
  category: string;
  file: string;
  preview: string;
  tags: string[];
}

const referenceSheets: ReferenceSheet[] = [
  {
    id: 'gas-flow-rates',
    title: 'Gas Flow Rates',
    description: 'Optimal gas flow rates for various welding processes and materials',
    category: 'technical',
    file: '/downloads/gas-flow-rates.pdf',
    preview: '/images/reference/gas-flow-rates.jpg',
    tags: ['Gas Flow', 'Settings', 'Technical']
  },
  {
    id: 'pressure-settings',
    title: 'Pressure Settings',
    description: 'Recommended pressure settings for different gas types and applications',
    category: 'technical',
    file: '/downloads/pressure-settings.pdf',
    preview: '/images/reference/pressure-settings.jpg',
    tags: ['Pressure', 'Settings', 'Technical']
  },
  {
    id: 'safety-checklist',
    title: 'Safety Checklist',
    description: 'Pre-welding safety checklist and emergency procedures',
    category: 'safety',
    file: '/downloads/safety-checklist.pdf',
    preview: '/images/reference/safety-checklist.jpg',
    tags: ['Safety', 'Checklist', 'PPE']
  },
  // Add more reference sheets...
]

export default function QuickReference() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSheet, setSelectedSheet] = useState<ReferenceSheet | null>(null)

  const filteredSheets = referenceSheets.filter(sheet =>
    sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search reference sheets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-xl 
                     bg-white/5 border border-[#FF8C42]/20
                     text-[#E5E5E5] placeholder-[#E5E5E5]/40
                     focus:outline-none focus:border-[#FF8C42]/50
                     transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E5E5E5]/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSheets.map((sheet) => (
          <motion.div
            key={sheet.id}
            className="bg-[#222222]/80 rounded-xl border border-[#FF8C42]/10 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Preview Image */}
            <div className="relative h-48 bg-[#1A1A1A]">
              <Image
                src={sheet.preview}
                alt={sheet.title}
                width={192}
                height={192}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className={`${outfit.className} text-xl font-[350] text-white mb-2`}>
                {sheet.title}
              </h3>
              <p className="text-[#E5E5E5]/60 mb-4">
                {sheet.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {sheet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full
                             bg-[#FF8C42]/10 text-[#FF8C42]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedSheet(sheet)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg
                           bg-[#1A1A1A] text-[#E5E5E5] hover:bg-[#FF8C42]/10
                           transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <a
                  href={sheet.file}
                  download
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg
                           bg-[#FF8C42] text-white hover:bg-[#FF8C42]/90
                           transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedSheet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedSheet(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1E1E1E] rounded-xl overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#FF8C42]/10">
              <div className="flex items-center justify-between">
                <h3 className={`${outfit.className} text-2xl font-[350] text-white`}>
                  {selectedSheet.title}
                </h3>
                <button
                  onClick={() => setSelectedSheet(null)}
                  className="text-[#E5E5E5]/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <Image
                src={selectedSheet.preview}
                alt={selectedSheet.title}
                width={192}
                height={192}
                className="w-full rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 