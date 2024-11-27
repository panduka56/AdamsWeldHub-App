'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import MaterialCard from '@/components/MaterialCard'
import { materialsData } from '@/lib/materials-data'

export default function MaterialsGuide() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMaterials = materialsData.filter(material =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.overview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-6 py-12">
      <Link 
        href="/" 
        className="inline-flex items-center text-[#FF8C42] mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Calculator
      </Link>

      <div className="space-y-12">
        <div className="bg-[#222222]/80 rounded-xl p-8">
          <h1 className="text-3xl font-[350] mb-6">Explore Materials for Your Welding Needs</h1>
          
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search materials..."
              className="w-full bg-[#1A1A1A] border border-[#FF8C42]/20 rounded-lg py-3 px-12 text-[#E5E5E5]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF8C42]/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMaterials.map((material, index) => (
              <MaterialCard key={index} material={material} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 