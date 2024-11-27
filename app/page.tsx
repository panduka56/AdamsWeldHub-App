"use client"

import WeldingGasCalculator from '../components/WeldingGasCalculator'
import BulkGasSavingsCalculator from '../components/BulkGasSavingsCalculator'
import WeldingDefectsTroubleshooting from '../components/WeldingDefectsTroubleshooting'
import QuickOrderTool from '../components/QuickOrderTool'
import { Outfit } from 'next/font/google'
import { Beaker, Calculator, Wrench, ShoppingCart, FileText, Bookmark, Shield } from 'lucide-react'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import NotesSection from '@/components/NotesSection'

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
  const [showNotes] = useState(false)

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator Section */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 
                         shadow-lg border border-gray-200 dark:border-[#FF8C42]/20 relative">
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

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Access Tools */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 
                           shadow-lg border border-gray-200 dark:border-[#FF8C42]/20">
              <h3 className={`${outfit.className} text-xl font-[350] text-gray-800 dark:text-white mb-4 tracking-[-0.02em]`}>
                Quick Tools
              </h3>
              <div className="space-y-3 relative">
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

            {/* Quick Reference Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 
                           shadow-lg border border-gray-200 dark:border-[#FF8C42]/20">
              <h3 className={`${outfit.className} text-xl font-[350] text-gray-800 dark:text-white mb-4 tracking-[-0.02em]`}>
                Quick Reference
              </h3>
              <div className="space-y-4 relative">
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

                {/* Notes Panel */}
                {showNotes && (
                  <div className="absolute top-full left-0 right-0 mt-4 
                                 bg-[#1E1E1E] rounded-xl p-6 border border-[#FF8C42]/20 
                                 shadow-lg z-10">
                    <NotesSection />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

