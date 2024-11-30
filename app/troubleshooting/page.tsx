'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Search, AlertTriangle, Flame, 
  Gauge, Zap, Shield, Info, ChevronDown, ChevronUp 
} from 'lucide-react'

interface TroubleshootingSection {
  id: string;
  title: string;
  icon: React.ElementType;
  issues: {
    id: string;
    title: string;
    symptoms: string[];
    causes: string[];
    solutions: string[];
    preventiveMeasures: string[];
  }[];
}

const troubleshootingSections: TroubleshootingSection[] = [
  {
    id: 'mig',
    title: 'MIG Welding Issues',
    icon: Zap,
    issues: [
      {
        id: 'porosity',
        title: 'Porosity',
        symptoms: [
          'Visible holes on weld surface',
          'Internal voids in weld metal',
          'Weak and spongy appearance',
          'Pinholes visible after cleaning'
        ],
        causes: [
          'Inadequate gas coverage',
          'Contaminated base metal',
          'Incorrect gas flow rate',
          'Wind interference',
          'Damaged gas hose or fittings',
          'Dirty wire feed',
          'Incorrect wire stick-out'
        ],
        solutions: [
          'Adjust gas flow rate to recommended settings',
          'Clean base metal thoroughly',
          'Check for gas leaks',
          'Use wind shields when necessary',
          'Replace damaged gas lines',
          'Clean or replace contact tip'
        ],
        preventiveMeasures: [
          'Regular equipment maintenance',
          'Proper storage of materials',
          'Use correct gas flow rates',
          'Maintain clean working environment',
          'Regular inspection of gas lines'
        ]
      },
      {
        id: 'spatter',
        title: 'Excessive Spatter',
        symptoms: [
          'Metal droplets around weld',
          'Rough weld appearance',
          'Increased clean-up time',
          'Poor weld aesthetics'
        ],
        causes: [
          'Voltage too high or low',
          'Wire feed speed incorrect',
          'Wrong polarity',
          'Insufficient gas coverage',
          'Dirty base material'
        ],
        solutions: [
          'Adjust voltage settings',
          'Optimize wire feed speed',
          'Check and correct polarity',
          'Increase gas coverage',
          'Clean base material properly'
        ],
        preventiveMeasures: [
          'Regular parameter checks',
          'Maintain clean materials',
          'Use anti-spatter spray when needed',
          'Proper machine setup'
        ]
      },
      {
        id: 'burnthrough',
        title: 'Burn Through',
        symptoms: [
          'Holes in the weld',
          'Excessive penetration',
          'Sagging weld pool',
          'Material warping'
        ],
        causes: [
          'Too much heat input',
          'Travel speed too slow',
          'Gap too large',
          'Material too thin for settings'
        ],
        solutions: [
          'Reduce voltage/amperage',
          'Increase travel speed',
          'Use proper joint preparation',
          'Adjust technique for material thickness'
        ],
        preventiveMeasures: [
          'Practice on similar materials',
          'Use proper settings chart',
          'Check material thickness',
          'Proper joint preparation'
        ]
      }
    ]
  },
  {
    id: 'tig',
    title: 'TIG Welding Issues',
    icon: Flame,
    issues: [
      {
        id: 'tungsten-contamination',
        title: 'Tungsten Contamination',
        symptoms: [
          'Black spots in weld',
          'Irregular weld appearance',
          'Reduced weld strength',
          'Spatter in weld pool'
        ],
        causes: [
          'Incorrect arc length',
          'Too high amperage',
          'Touching tungsten to weld pool',
          'Wrong tungsten type',
          'Improper shielding gas'
        ],
        solutions: [
          'Maintain proper arc length',
          'Adjust amperage settings',
          'Use correct tungsten size',
          'Proper tungsten preparation',
          'Check gas coverage'
        ],
        preventiveMeasures: [
          'Regular electrode inspection',
          'Proper electrode grinding',
          'Correct machine setup',
          'Operator training',
          'Use proper tungsten type'
        ]
      },
      {
        id: 'oxidation',
        title: 'Weld Oxidation',
        symptoms: [
          'Discoloration around weld',
          'Rainbow colors on surface',
          'Dull gray appearance',
          'Poor corrosion resistance'
        ],
        causes: [
          'Insufficient gas coverage',
          'Contaminated gas supply',
          'Wrong gas mixture',
          'Post-weld exposure to air',
          'Gas flow too low'
        ],
        solutions: [
          'Increase gas coverage',
          'Check gas purity',
          'Use proper gas mixture',
          'Maintain post-flow gas',
          'Clean material properly'
        ],
        preventiveMeasures: [
          'Regular gas system checks',
          'Proper gas flow settings',
          'Clean material storage',
          'Use backing gas when needed'
        ]
      }
    ]
  },
  {
    id: 'general',
    title: 'General Welding Issues',
    icon: AlertTriangle,
    issues: [
      {
        id: 'distortion',
        title: 'Weld Distortion',
        symptoms: [
          'Warped material',
          'Misaligned joints',
          'Bent or twisted workpiece',
          'Stress cracks'
        ],
        causes: [
          'Excessive heat input',
          'Poor clamping',
          'Incorrect welding sequence',
          'Uneven heat distribution',
          'Material thickness variations'
        ],
        solutions: [
          'Use proper clamping',
          'Follow correct welding sequence',
          'Control heat input',
          'Use backstep welding technique',
          'Pre-set parts accounting for shrinkage'
        ],
        preventiveMeasures: [
          'Proper planning of weld sequence',
          'Use of jigs and fixtures',
          'Temperature monitoring',
          'Stress relief when needed'
        ]
      },
      {
        id: 'cracking',
        title: 'Weld Cracking',
        symptoms: [
          'Visible cracks in weld',
          'Delayed cracking',
          'Surface or internal cracks',
          'Crater cracks'
        ],
        causes: [
          'High cooling rate',
          'Residual stress',
          'Poor joint preparation',
          'Wrong filler material',
          'Hydrogen contamination'
        ],
        solutions: [
          'Proper preheating',
          'Use correct filler metal',
          'Control cooling rate',
          'Clean materials thoroughly',
          'Proper joint design'
        ],
        preventiveMeasures: [
          'Material testing before welding',
          'Proper storage of consumables',
          'Temperature control procedures',
          'Quality control checks'
        ]
      }
    ]
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: troubleshootingSections.flatMap(section => 
    section.issues.map(issue => ({
      '@type': 'Question',
      name: issue.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: issue.solutions.join(' ')
      }
    }))
  )
}

export default function TroubleshootingGuide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [expandedIssues, setExpandedIssues] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const toggleIssue = (issueId: string) => {
    setExpandedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    )
  }

  const filteredSections = troubleshootingSections.map(section => ({
    ...section,
    issues: section.issues.filter(issue =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      issue.causes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(section => section.issues.length > 0)

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Link 
          href="/"
          className="inline-flex items-center text-[#FF8C42]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <Link
          href="/gas-flow-chart"
          className="inline-flex items-center text-[#FF8C42]"
        >
          <Gauge className="w-5 h-5 mr-2" />
          Gas Flow Chart
        </Link>
      </div>

      {/* Title Section */}
      <div className="bg-[#222222]/80 rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-[350] mb-4">Welding Troubleshooting Guide</h1>
        <p className="text-[#E5E5E5]/80 mb-6">
          Comprehensive solutions for common welding issues. Find quick fixes and preventive measures.
        </p>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search issues, symptoms, or solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-[#FF8C42]/20 rounded-lg 
                     py-3 px-12 text-[#E5E5E5] placeholder-[#E5E5E5]/40"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF8C42]/60" />
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {filteredSections.map(section => (
          <div key={section.id} className="bg-[#222222]/80 rounded-xl overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 
                       hover:bg-[#FF8C42]/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <section.icon className="w-6 h-6 text-[#FF8C42]" />
                <h2 className="text-2xl font-[350]">{section.title}</h2>
              </div>
              {expandedSections.includes(section.id) 
                ? <ChevronUp className="w-5 h-5 text-[#FF8C42]" />
                : <ChevronDown className="w-5 h-5 text-[#FF8C42]" />
              }
            </button>

            {/* Section Content */}
            {expandedSections.includes(section.id) && (
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  {section.issues.map(issue => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20"
                    >
                      <button
                        onClick={() => toggleIssue(issue.id)}
                        className="w-full flex items-center justify-between p-4
                                 hover:bg-[#FF8C42]/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-[#FF8C42]" />
                          <h3 className="text-lg font-[350]">{issue.title}</h3>
                        </div>
                        {expandedIssues.includes(issue.id)
                          ? <ChevronUp className="w-4 h-4 text-[#FF8C42]" />
                          : <ChevronDown className="w-4 h-4 text-[#FF8C42]" />
                        }
                      </button>

                      {expandedIssues.includes(issue.id) && (
                        <div className="p-4 pt-0">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-[#FF8C42] mb-2">Symptoms</h4>
                              <ul className="space-y-2 text-sm text-[#E5E5E5]/80">
                                {issue.symptoms.map((symptom, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 flex-shrink-0" />
                                    {symptom}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-[#FF8C42] mb-2">Causes</h4>
                              <ul className="space-y-2 text-sm text-[#E5E5E5]/80">
                                {issue.causes.map((cause, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 flex-shrink-0" />
                                    {cause}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="text-[#FF8C42] mb-2">Solutions</h4>
                            <ul className="space-y-2 text-sm text-[#E5E5E5]/80">
                              {issue.solutions.map((solution, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 flex-shrink-0" />
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-4 p-4 bg-[#FF8C42]/5 rounded-lg border border-[#FF8C42]/20">
                            <h4 className="text-[#FF8C42] mb-2 flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Preventive Measures
                            </h4>
                            <ul className="space-y-2 text-sm text-[#E5E5E5]/80">
                              {issue.preventiveMeasures.map((measure, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 flex-shrink-0" />
                                  {measure}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-12 bg-[#222222]/80 rounded-xl p-8">
        <h2 className="text-2xl font-[350] mb-4">About Welding Troubleshooting</h2>
        <p className="text-[#E5E5E5]/80 mb-6">
          Understanding common welding issues and their solutions is crucial for achieving high-quality welds.
          This guide covers various problems encountered in MIG, TIG, and general welding processes,
          providing detailed solutions and preventive measures.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[#FF8C42] text-lg mb-3">Key Benefits</h3>
            <ul className="space-y-2 text-[#E5E5E5]/80">
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-1 flex-shrink-0" />
                Quick problem identification
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-1 flex-shrink-0" />
                Step-by-step solutions
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-1 flex-shrink-0" />
                Preventive maintenance tips
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#FF8C42] text-lg mb-3">Related Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/gas-flow-chart"
                  className="text-[#E5E5E5]/80 hover:text-[#FF8C42] transition-colors"
                >
                  Gas Flow Chart →
                </Link>
              </li>
              <li>
                <Link 
                  href="/materials-guide"
                  className="text-[#E5E5E5]/80 hover:text-[#FF8C42] transition-colors"
                >
                  Materials Guide →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  )
} 