'use client'

import { useState } from 'react'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface OrderItem {
  gasType: string;
  quantity: number;
  cylinderSize: string;
}

export default function QuickOrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([{
    gasType: '',
    quantity: 1,
    cylinderSize: 'standard'
  }])

  const addItem = () => {
    setOrderItems([...orderItems, { gasType: '', quantity: 1, cylinderSize: 'standard' }])
  }

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...orderItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setOrderItems(newItems)
  }

  const handleSubmit = () => {
    // Here you would typically send the order to your backend
    console.log('Order submitted:', orderItems)
    alert('Order submitted successfully!')
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
                    dark:border-[#FF8C42]/20 p-8 max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <ShoppingCart className="w-6 h-6 text-[#FF8C42] mr-2" />
          <h1 className="text-2xl font-[350]">Quick Order</h1>
        </div>

        <div className="space-y-6">
          {orderItems.map((item, index) => (
            <div key={index} className="p-4 border border-[#FF8C42]/20 rounded-lg">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2">Gas Type</label>
                  <select
                    value={item.gasType}
                    onChange={(e) => updateItem(index, 'gasType', e.target.value)}
                    className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
                  >
                    <option value="">Select Gas</option>
                    <option value="argon">Argon</option>
                    <option value="co2">CO₂</option>
                    <option value="oxygen">Oxygen</option>
                    <option value="acetylene">Acetylene</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Cylinder Size</label>
                  <select
                    value={item.cylinderSize}
                    onChange={(e) => updateItem(index, 'cylinderSize', e.target.value)}
                    className="w-full p-2 rounded-lg bg-transparent border border-[#FF8C42]/20"
                  >
                    <option value="small">Small (10L)</option>
                    <option value="standard">Standard (47L)</option>
                    <option value="large">Large (50L)</option>
                  </select>
                </div>
              </div>

              {orderItems.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="mt-4 text-sm text-red-500 hover:text-red-600"
                >
                  Remove Item
                </button>
              )}
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={addItem}
              className="px-4 py-2 border border-[#FF8C42] text-[#FF8C42] rounded-lg hover:bg-[#FF8C42]/10"
            >
              Add Another Item
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90"
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 