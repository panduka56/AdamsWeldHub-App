"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight, Search, Shield, AlertTriangle, Users, Wrench } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { safetyTips, categories, type SafetyTip } from '@/app/data/safetyTips'
import { Input } from "@/components/ui/input"

const MotionCard = motion(Card) as typeof motion.div

function getIconForCategory(category: string) {
  const icons = {
    'Personal Protection': Shield,
    'Equipment Safety': Wrench,
    'Workspace Management': Users,
    'default': AlertTriangle
  }
  return icons[category as keyof typeof icons] || icons.default
}

export default function SafetyTipsPage() {
  const [selectedTip, setSelectedTip] = useState<SafetyTip | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTips = safetyTips.filter(tip => {
    const matchesSearch = 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || tip.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const tips = filteredTips.map(tip => ({
    ...tip,
    icon: getIconForCategory(tip.category)
  }))

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#1A1A1A]"
    >
      <div className="container mx-auto p-6">
        <Link href="/" className="inline-flex items-center text-[#FF8C42] mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-12 gap-6">
          {/* List View */}
          <motion.div 
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="col-span-4 border-r border-[#FF8C42]/20 pr-6"
          >
            <h2 className="text-xl font-[350] text-white mb-6">Safety Tips</h2>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search safety tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${!selectedCategory 
                      ? 'bg-[#FF8C42]/20 text-[#FF8C42]' 
                      : 'bg-[#FF8C42]/10 text-[#FF8C42]/80'
                    } cursor-pointer transition-colors`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${selectedCategory === category 
                        ? 'bg-[#FF8C42]/20 text-[#FF8C42]' 
                        : 'bg-[#FF8C42]/10 text-[#FF8C42]/80'
                      } cursor-pointer transition-colors`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <AnimatePresence>
                {tips.map((tip) => (
                  <MotionCard
                    key={tip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      marginBottom: "0.5rem",
                      cursor: "pointer",
                      backgroundColor: selectedTip?.id === tip.id ? "rgba(255, 140, 66, 0.2)" : ""
                    }}
                    onTap={() => setSelectedTip(tip)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {tip.icon && <tip.icon className="w-4 h-4 text-[#FF8C42]" />}
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FF8C42]/10 text-[#FF8C42]">
                          {tip.category}
                        </span>
                      </div>
                      <h3 className="text-[#E5E5E5] font-medium mb-1">{tip.title}</h3>
                      <p className="text-[#E5E5E5]/60 text-sm line-clamp-2">
                        {tip.summary}
                      </p>
                    </CardContent>
                  </MotionCard>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </motion.div>

          {/* Detail View */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-8 pl-6"
          >
            <AnimatePresence mode="wait">
              {selectedTip ? (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {selectedTip.icon && (
                      <selectedTip.icon className="w-6 h-6 text-[#FF8C42]" />
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FF8C42]/10 text-[#FF8C42]">
                      {selectedTip.category}
                    </span>
                  </div>
                  <h1 className="text-2xl text-[#E5E5E5] font-medium">
                    {selectedTip.title}
                  </h1>
                  
                  <Card className="bg-[#252525] border-[#FF8C42]/20">
                    <CardContent className="p-6 space-y-6">
                      <p className="text-[#E5E5E5]/80 leading-relaxed">
                        {selectedTip.details.introduction}
                      </p>
                      
                      <div className="space-y-3">
                        <h2 className="text-[#FF8C42] font-medium">Key Points:</h2>
                        <ul className="space-y-2">
                          {selectedTip.details.keyPoints.map((point, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start text-[#E5E5E5]/80"
                            >
                              <ChevronRight className="w-4 h-4 text-[#FF8C42] mt-1 mr-2 flex-shrink-0" />
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center"
                >
                  <h2 className="text-xl text-[#E5E5E5] mb-2">Select a Safety Tip</h2>
                  <p className="text-[#E5E5E5]/60">
                    Choose a topic from the list to view detailed safety guidelines
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 