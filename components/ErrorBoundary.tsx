'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <div>
      {children}
    </div>
  )
}

// Separate error component for error UI
export function ErrorDisplay({ error, reset }: { 
  error: Error & { digest?: string }, 
  reset: () => void 
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-[350] text-red-500">Something went wrong!</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
} 