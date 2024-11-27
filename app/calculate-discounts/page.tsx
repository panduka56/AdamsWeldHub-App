'use client'

import { useState } from 'react'
import { Percent, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DiscountTier {
  minVolume: number;
  percentage: number;
}

const discountTiers: DiscountTier[] = [
  { minVolume: 100, percentage: 15 },
  { minVolume: 50, percentage: 10 },
  { minVolume: 20, percentage: 5 },
]

export default function CalculateDiscountsPage() {
  const [orderDetails, setOrderDetails] = useState({
    basePrice: 0,
    quantity: 0,
    gasType: '',
  })

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)

  const calculateDiscount = () => {
    const { basePrice, quantity } = orderDetails
    const tier = discountTiers.find(t => quantity >= t.minVolume)
    const discount = tier ? tier.percentage / 100 : 0
    const total = basePrice * quantity * (1 - discount)
    setCalculatedPrice(total)
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
          <Percent className="w-6 h-6 text-[#FF8C42] mr-2" />
          <h1 className="text-2xl font-[350]">Calculate Bulk Discounts</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Gas Type</label>
            <select
              value={orderDetails.gasType}
              onChange={(e) => setOrderDetails(prev => ({ ...prev, gasType: e.target.value }))}
              className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
            >
              <option value="">Select Gas Type</option>
              <option value="argon">Argon</option>
              <option value="co2">CO₂</option>
              <option value="oxygen">Oxygen</option>
              <option value="acetylene">Acetylene</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Base Price (£)</label>
            <input
              type="number"
              value={orderDetails.basePrice}
              onChange={(e) => setOrderDetails(prev => ({ ...prev, basePrice: Number(e.target.value) }))}
              className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Quantity</label>
            <input
              type="number"
              value={orderDetails.quantity}
              onChange={(e) => setOrderDetails(prev => ({ ...prev, quantity: Number(e.target.value) }))}
              className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
            />
          </div>

          <button
            onClick={calculateDiscount}
            className="w-full py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90"
          >
            Calculate Price
          </button>

          {calculatedPrice !== null && (
            <div className="mt-6 p-4 rounded-lg bg-[#FF8C42]/10 border border-[#FF8C42]/20">
              <h3 className="text-lg font-medium mb-2">Total Price</h3>
              <p className="text-2xl font-bold text-[#FF8C42]">£{calculatedPrice.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 