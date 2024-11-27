'use client'

import type { SafetyTip } from '@/data/safety'

interface SafetyLayoutProps {
  _tip: SafetyTip;
}

export default function SafetyLayout({ _tip }: SafetyLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Layout content */}
    </div>
  )
} 