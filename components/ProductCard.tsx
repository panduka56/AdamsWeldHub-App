import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Product } from '@/lib/types'
import { Cylinder, Info, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const gasMix = product.Content.match(/Gas Type: ([^‣<]+)/)?.[1]?.trim()
  const cleanContent = product.Content.replace(/<[^>]*>/g, '')
  const shortDescription = cleanContent.slice(0, 120) + '...'

  return (
    <Card 
      className="bg-[#1A1A1A] border border-[#FF8C42]/20 hover:border-[#FF8C42]/40 
                transition-all duration-200 overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] 
                    flex items-center justify-center">
        <Cylinder className="w-24 h-24 text-[#FF8C42]/50 group-hover:text-[#FF8C42]/70 transition-colors" />
        {gasMix && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-sm text-[#FF8C42]">
            {gasMix}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-[350] mb-2 group-hover:text-[#FF8C42] transition-colors">
          {product.Title}
        </h3>
        <p className="text-[#E5E5E5]/60 text-sm mb-4">{shortDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {product.categories.map((cat, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-[#FF8C42]/10 
                                   text-[#FF8C42] border border-[#FF8C42]/20">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div 
        className={`absolute inset-0 bg-gradient-to-b from-black/90 to-black/95 
                   flex flex-col justify-end p-6 transition-all duration-300 
                   ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="space-y-3">
          <Link href={`/products/${product.Slug}`} className="block">
            <Button 
              variant="default" 
              className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 flex items-center justify-center gap-2 py-6"
            >
              <Info className="w-4 h-4" />
              View Details
            </Button>
          </Link>
          <a 
            href={`https://adamsgas.co.uk/product/${product.Slug}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              variant="outline" 
              className="w-full border-[#FF8C42]/20 text-[#FF8C42] hover:bg-[#FF8C42]/10
                       flex items-center justify-center gap-2 py-6"
            >
              <ExternalLink className="w-4 h-4" />
              Buy Now
            </Button>
          </a>
        </div>
      </div>
    </Card>
  )
} 