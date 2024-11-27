import { notFound } from 'next/navigation'
import SafetyLayout from '@/components/layouts/SafetyLayout'
import safetyTips, { type SafetyTip } from '@/data/safety'

export default function SafetyPage({ params }: { params: { id: string } }) {
  const tip = safetyTips.find((t: SafetyTip) => t.id === params.id)
  if (!tip) notFound()

  return <SafetyLayout tip={tip} />
} 