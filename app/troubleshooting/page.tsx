import { categories, troubleshootingIssues, TroubleshootingIssue } from '@/app/data/troubleshootingIssues'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function TroubleshootingDirectory() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Welding Troubleshooting Guide</h1>
      
      <div className="mb-12">
        <Link
          href="/gas-flow-chart"
          className="inline-flex items-center p-4 rounded-lg 
                     bg-[#FF8C42] text-white hover:bg-[#FF8C42]/90 
                     transition-colors"
        >
          <FileText className="w-5 h-5 mr-2" />
          Gas Flow Cheat Sheet - Quick Reference Guide
        </Link>
      </div>
      
      <div className="space-y-8">
        {categories.map((category: string) => {
          const issues = troubleshootingIssues.filter(
            (issue: TroubleshootingIssue) => issue.category === category
          )
          
          return (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-[350] text-[#FF8C42]">{category}</h2>
              <div className="grid gap-4">
                {issues.map((issue: TroubleshootingIssue) => (
                  <Link
                    key={issue.id}
                    href={`/troubleshooting/${issue.id}`}
                    className="p-4 rounded-lg bg-[#222222]/80 
                             border border-[#FF8C42]/20
                             hover:border-[#FF8C42]/50 transition-colors"
                  >
                    <h3 className="text-xl mb-2">{issue.title}</h3>
                    <p className="text-[#E5E5E5]/60">{issue.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 