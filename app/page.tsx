"use client"

import WeldingGasCalculator from '../components/WeldingGasCalculator'
import BulkGasSavingsCalculator from '../components/BulkGasSavingsCalculator'
import WeldingDefectsTroubleshooting from '../components/WeldingDefectsTroubleshooting'
import QuickOrderTool from '../components/QuickOrderTool'
import { Outfit } from 'next/font/google'
import { 
  Beaker, Calculator, Wrench, ShoppingCart, 
  FileText, Bookmark, Shield, Flame 
} from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { oxyFuelGases } from '@/lib/oxy-fuel-data'
import { useState } from 'react'

const outfit = Outfit({ subsets: ['latin'] })

type ToolId = 'calculator' | 'materials' | 'bulk' | 'troubleshoot' | 'order' | 'safety' | null;

interface Tool {
  id: ToolId
  title: string
  Component: React.ComponentType | null
  icon: React.ElementType
  desc: string
  href?: string
}

export default function Home() {
  const [activeToolId, setActiveToolId] = useState<ToolId>(null)

  const tools: Tool[] = [
    { id: 'calculator', title: 'Gas Calculator', Component: WeldingGasCalculator, icon: Calculator, desc: 'Calculate optimal gas mix' },
    { id: 'materials', title: 'Materials Guide', Component: null, icon: Beaker, desc: 'Explore detailed material properties and welding recommendations', href: '/materials-guide' },
    { id: 'bulk', title: 'Bulk Savings', Component: BulkGasSavingsCalculator, icon: Calculator, desc: 'Calculate bulk discounts' },
    { id: 'troubleshoot', title: 'Troubleshooting', Component: WeldingDefectsTroubleshooting, icon: Wrench, desc: 'Common issues & fixes' },
    { id: 'order', title: 'Quick Order', Component: QuickOrderTool, icon: ShoppingCart, desc: 'Reorder gas supplies' },
    { id: 'safety', title: 'Safety Tips', Component: null, icon: Shield, desc: 'Essential safety guidelines', href: '/safety-tips' }
  ]

  const selectedTool = tools.find(t => t.id === activeToolId)
  const ActiveComponent = selectedTool?.Component

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#111111] dark:to-[#1A1A1A]">
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Main Calculator Section - Now full width */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 
                         shadow-lg border border-gray-200 dark:border-[#FF8C42]/20">
            <h2 className={`${outfit.className} text-4xl font-[350] text-gray-800 dark:text-white mb-8 tracking-[-0.02em]`}>
              {selectedTool ? selectedTool.title : 'Gas Calculator'}
            </h2>
            <div className="relative">
              {ActiveComponent ? (
                <div className="animate-fadeIn">
                  <ActiveComponent />
                </div>
              ) : (
                <WeldingGasCalculator />
              )}
            </div>
          </div>

          {/* Quick Tools Section - Now full width */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 
                         shadow-lg border border-gray-200 dark:border-[#FF8C42]/20">
            <h3 className={`${outfit.className} text-xl font-[350] text-gray-800 dark:text-white mb-4 tracking-[-0.02em]`}>
              Quick Tools
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                tool.href ? (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="w-full bg-gray-50 hover:bg-[#FF8C42]/5 
                             dark:bg-[#252525] dark:hover:bg-[#FF8C42]/10 p-4 rounded-xl 
                             transition-all duration-200 border border-gray-200 dark:border-[#FF8C42]/20 
                             text-left flex items-center"
                  >
                    <div className="flex items-center justify-center w-10 h-10 
                                  bg-gray-100 dark:bg-[#2A2A2A] rounded-lg mr-4">
                      <tool.icon className="w-5 h-5 text-[#FF8C42]" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`${outfit.className} text-gray-800 dark:text-white font-[350] mb-1`}>
                        {tool.title}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-300 text-sm">{tool.desc}</p>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolId(tool.id)}
                    className="w-full bg-gray-50 hover:bg-[#FF8C42]/5 
                             dark:bg-[#252525] dark:hover:bg-[#FF8C42]/10 p-4 rounded-xl 
                             transition-all duration-200 border border-gray-200 dark:border-[#FF8C42]/20 
                             text-left flex items-center"
                  >
                    <div className="flex items-center justify-center w-10 h-10 
                                  bg-gray-100 dark:bg-[#2A2A2A] rounded-lg mr-4">
                      <tool.icon className="w-5 h-5 text-[#FF8C42]" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`${outfit.className} text-gray-800 dark:text-white font-[350] mb-1`}>
                        {tool.title}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-300 text-sm">{tool.desc}</p>
                    </div>
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Quick Reference Section - Now full width */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 
                         shadow-lg border border-gray-200 dark:border-[#FF8C42]/20">
            <h3 className={`${outfit.className} text-xl font-[350] text-gray-800 dark:text-white mb-4 tracking-[-0.02em]`}>
              Quick Reference
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/gas-flow-chart"
                className="w-full bg-gray-50 hover:bg-[#FF8C42]/5 
                         dark:bg-[#252525] dark:hover:bg-[#FF8C42]/10 p-4 rounded-xl 
                         transition-all duration-200 border border-gray-200 dark:border-[#FF8C42]/20 
                         text-left flex items-center"
              >
                <div className="flex items-center justify-center w-10 h-10 
                              bg-gray-100 dark:bg-[#2A2A2A] rounded-lg mr-4 
                              group-hover:bg-[#FF8C42]/10 transition-colors">
                  <FileText className="w-5 h-5 text-gray-600 group-hover:text-[#FF8C42] 
                                     dark:text-[#FF8C42] dark:group-hover:text-[#FFA366] transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className={`${outfit.className} text-gray-800 dark:text-white font-[350] mb-1 tracking-tight`}>
                    Gas Flow Cheat Sheet
                  </h4>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">Quick reference for optimal settings</p>
                </div>
              </Link>
              <Link 
                href="/notes"
                className="w-full bg-gray-50 hover:bg-[#FF8C42]/5 
                         dark:bg-[#252525] dark:hover:bg-[#FF8C42]/10 p-4 rounded-xl 
                         transition-all duration-200 border border-gray-200 dark:border-[#FF8C42]/20 
                         text-left flex items-center"
              >
                <div className="flex items-center justify-center w-10 h-10 
                              bg-gray-100 dark:bg-[#2A2A2A] rounded-lg mr-4 
                              group-hover:bg-[#FF8C42]/10 transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-[#FF8C42] 
                                     dark:text-[#FF8C42] dark:group-hover:text-[#FFA366] transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className={`${outfit.className} text-gray-800 dark:text-white font-[350] mb-1 tracking-tight`}>
                    Notes & Bookmarks
                  </h4>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">Save important calculations</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Material-Specific Guide */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 
                          shadow-lg border border-gray-200 dark:border-[#FF8C42]/20">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-6 h-6 text-[#FF8C42]" />
              <h3 className={`${outfit.className} text-xl font-[350] text-gray-800 dark:text-white tracking-[-0.02em]`}>
                Process Guide
              </h3>
            </div>

            {/* Process Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Welding Card */}
              <div className="p-6 bg-gray-50 dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-[#FF8C42]/20">
                <h4 className="text-lg font-[350] text-gray-800 dark:text-[#FF8C42] mb-4">Welding</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-2">Mild Steel</h5>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-[#E5E5E5]/80">
                      <li>Gas: O₂ / Acetylene</li>
                      <li>Thickness: 0.5–12 mm</li>
                      <li>O₂: 5–15 L/min; C₂H₂: 2–5 L/min</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-2">Aluminum & Stainless</h5>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-[#E5E5E5]/80">
                      <li>Gas: O₂ / Hydrogen</li>
                      <li>Thickness: &lt; 3 mm</li>
                      <li>O₂: 10–20 L/min; H₂: 5–10 L/min</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cutting Card */}
              <div className="p-6 bg-gray-50 dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-[#FF8C42]/20">
                <h4 className="text-lg font-[350] text-gray-800 dark:text-[#FF8C42] mb-4">Cutting</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-2">Mild Steel & Cast Iron</h5>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-[#E5E5E5]/80">
                      <li>Gas: O₂ / Acetylene or Propylene</li>
                      <li>Thickness: &gt; 3 mm</li>
                      <li>O₂: 30–60 L/min; Fuel: 5–15 L/min</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Heating Card */}
              <div className="p-6 bg-gray-50 dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-[#FF8C42]/20">
                <h4 className="text-lg font-[350] text-gray-800 dark:text-[#FF8C42] mb-4">Heating</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-2">All Materials</h5>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-[#E5E5E5]/80">
                      <li>Gas: O₂ / Acetylene or Propylene</li>
                      <li>O₂: 50–120 L/min</li>
                      <li>Fuel: 20–50 L/min</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Brazing Card */}
              <div className="p-6 bg-gray-50 dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-[#FF8C42]/20">
                <h4 className="text-lg font-[350] text-gray-800 dark:text-[#FF8C42] mb-4">Brazing</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-2">Copper & Brass</h5>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-[#E5E5E5]/80">
                      <li>Gas: Air / Acetylene</li>
                      <li>Thickness: &lt; 6 mm</li>
                      <li>Acetylene: 3–6 L/min</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Gas Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[#FF8C42]/20">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-[#FF8C42]">Gas</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-[#FF8C42]">Welding</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-[#FF8C42]">Cutting</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-[#FF8C42]">Heating</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-[#FF8C42]">Brazing</th>
                  </tr>
                </thead>
                <tbody>
                  {oxyFuelGases.map((gas) => (
                    <tr key={gas.gas} 
                        className="border-b border-gray-100 dark:border-[#FF8C42]/10">
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-[#E5E5E5]">{gas.gas}</td>
                      <td className="py-3 px-4 text-center text-sm text-gray-800 dark:text-[#E5E5E5]">{gas.welding}</td>
                      <td className="py-3 px-4 text-center text-sm text-gray-800 dark:text-[#E5E5E5]">{gas.cutting}</td>
                      <td className="py-3 px-4 text-center text-sm text-gray-800 dark:text-[#E5E5E5]">{gas.heating}</td>
                      <td className="py-3 px-4 text-center text-sm text-gray-800 dark:text-[#E5E5E5]">{gas.brazing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

