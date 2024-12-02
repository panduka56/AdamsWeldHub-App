import { notFound } from 'next/navigation'
import SafetyLayout from '@/components/layouts/SafetyLayout'
import { safetyTips, type SafetyTip } from '@/utils/safety-data'

export async function generateStaticParams() {
  return safetyTips.map((tip: SafetyTip) => ({
    id: tip.id,
  }))
}

export default function SafetyPage({ params }: { params: { id: string } }) {
  const tip = safetyTips.find((t: SafetyTip) => t.id === params.id)
  if (!tip) notFound()

  return <SafetyLayout tip={tip} />
} 