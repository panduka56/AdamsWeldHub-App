import { notFound } from 'next/navigation'
import { troubleshootingIssues, TroubleshootingIssue } from '@/app/data/troubleshootingIssues'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return troubleshootingIssues.map((issue) => ({
    id: issue.id,
  }))
}

export default function IssuePage({ params }: { params: { id: string } }) {
  const issue = troubleshootingIssues.find((i: TroubleshootingIssue) => i.id === params.id)
  if (!issue) notFound()

  return (
    <div className="container mx-auto px-6 py-12">
      <Link 
        href="/troubleshooting" 
        className="inline-flex items-center text-[#FF8C42] mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Issues
      </Link>

      <div className="bg-[#222222]/80 rounded-xl p-8">
        <h1 className="text-3xl font-[350] mb-6">{issue.title}</h1>
        <p className="text-[#E5E5E5]/80 mb-8">{issue.description}</p>

        <div className="space-y-8">
          {/* Causes */}
          <section>
            <h2 className="text-2xl font-[350] mb-4">Causes</h2>
            <ul className="list-disc pl-5 space-y-2">
              {issue.causes.map((cause: string, index: number) => (
                <li key={index} className="text-[#E5E5E5]/60">{cause}</li>
              ))}
            </ul>
          </section>

          {/* Solutions */}
          <section>
            <h2 className="text-2xl font-[350] mb-4">Solutions</h2>
            <ul className="list-disc pl-5 space-y-2">
              {issue.solutions.map((solution: string, index: number) => (
                <li key={index} className="text-[#E5E5E5]/60">{solution}</li>
              ))}
            </ul>
          </section>

          {/* Equipment */}
          <section>
            <h2 className="text-2xl font-[350] mb-4">Equipment Needed</h2>
            <ul className="list-disc pl-5 space-y-2">
              {issue.equipment.map((item: string, index: number) => (
                <li key={index} className="text-[#E5E5E5]/60">{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
} 