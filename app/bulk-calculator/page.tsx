'use client'

import { useState } from 'react'
import { Calculator, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'

interface GasPrice {
  [key: string]: {
    basePrice: number;
    bulkDiscounts: {
      quantity: number;
      discount: number;
    }[];
  };
}

const gasPrices: GasPrice = {
  'argon': {
    basePrice: 75,
    bulkDiscounts: [
      { quantity: 100, discount: 0.15 },
      { quantity: 50, discount: 0.10 },
      { quantity: 20, discount: 0.05 }
    ]
  },
  'co2': {
    basePrice: 45,
    bulkDiscounts: [
      { quantity: 100, discount: 0.15 },
      { quantity: 50, discount: 0.10 },
      { quantity: 20, discount: 0.05 }
    ]
  },
  'oxygen': {
    basePrice: 55,
    bulkDiscounts: [
      { quantity: 100, discount: 0.15 },
      { quantity: 50, discount: 0.10 },
      { quantity: 20, discount: 0.05 }
    ]
  },
  'acetylene': {
    basePrice: 85,
    bulkDiscounts: [
      { quantity: 100, discount: 0.15 },
      { quantity: 50, discount: 0.10 },
      { quantity: 20, discount: 0.05 }
    ]
  }
}

export default function BulkCalculatorPage() {
  const [gasType, setGasType] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)
  const [calculation, setCalculation] = useState<{
    subtotal: number;
    discount: number;
    total: number;
  } | null>(null)

  const calculatePrice = () => {
    if (!gasType || quantity <= 0) return

    const gas = gasPrices[gasType]
    const subtotal = gas.basePrice * quantity
    
    // Find applicable discount
    const discount = gas.bulkDiscounts.reduce((acc, curr) => {
      if (quantity >= curr.quantity && curr.discount > acc) {
        return curr.discount
      }
      return acc
    }, 0)

    const discountAmount = subtotal * discount
    const total = subtotal - discountAmount

    setCalculation({
      subtotal,
      discount: discountAmount,
      total
    })
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
          <h1 className="text-2xl font-[350]">Bulk Order Calculator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Gas Type</label>
            <select
              value={gasType}
              onChange={(e) => setGasType(e.target.value)}
              className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
            >
              <option value="">Select Gas Type</option>
              {Object.keys(gasPrices).map((gas) => (
                <option key={gas} value={gas}>
                  {gas.charAt(0).toUpperCase() + gas.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Quantity (cylinders)</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
            />
          </div>

          {gasType && (
            <div className="p-4 rounded-lg bg-[#FF8C42]/10 border border-[#FF8C42]/20">
              <div className="flex items-center mb-2">
                <Info className="w-4 h-4 text-[#FF8C42] mr-2" />
                <span className="text-sm font-medium">Bulk Discount Tiers</span>
              </div>
              <ul className="text-sm space-y-1">
                {gasPrices[gasType].bulkDiscounts.map((tier) => (
                  <li key={tier.quantity}>
                    {tier.quantity}+ cylinders: {(tier.discount * 100)}% discount
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={calculatePrice}
            className="w-full py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90"
          >
            Calculate Price
          </button>

          {calculation && (
            <div className="mt-6 p-4 rounded-lg bg-[#FF8C42]/10 border border-[#FF8C42]/20">
              <h3 className="text-lg font-medium mb-4">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>£{calculation.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#FF8C42]">
                  <span>Bulk Discount:</span>
                  <span>-£{calculation.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-[#FF8C42]/20">
                  <span>Total:</span>
                  <span>£{calculation.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 