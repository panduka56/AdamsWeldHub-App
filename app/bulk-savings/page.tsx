'use client'

import { useState } from 'react'
import { Calculator, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BulkSavingsPage() {
  const [volume, setVolume] = useState<number>(0)
  const [basePrice, setBasePrice] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)

  const calculateSavings = () => {
    const bulkDiscount = volume >= 100 ? 0.15 : volume >= 50 ? 0.10 : volume >= 20 ? 0.05 : 0
    setDiscount(basePrice * volume * bulkDiscount)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link 
        href="/" 
        className="inline-flex items-center text-[#FF8C42] mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Calculator
      </Link>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 
                    dark:border-[#FF8C42]/20 p-8 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Calculator className="w-6 h-6 text-[#FF8C42] mr-2" />
          <h1 className="text-2xl font-[350]">Bulk Savings Calculator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Volume (cylinders)</label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Base Price per Cylinder (£)</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
            />
          </div>

          <button
            onClick={calculateSavings}
            className="w-full py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90"
          >
            Calculate Savings
          </button>

          {discount > 0 && (
            <div className="mt-6 p-4 rounded-lg bg-[#FF8C42]/10 border border-[#FF8C42]/20">
              <h3 className="text-lg font-medium mb-2">Potential Savings</h3>
              <p className="text-2xl font-bold text-[#FF8C42]">£{discount.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 