"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const bannerImages = [
  { src: "/placeholder.svg?height=400&width=1200", alt: "MIG Welding", title: "Precision MIG Welding" },
  { src: "/placeholder.svg?height=400&width=1200", alt: "TIG Welding", title: "Advanced TIG Techniques" },
  { src: "/placeholder.svg?height=400&width=1200", alt: "Gas Cylinders", title: "Premium Gas Solutions" },
]

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-2xl font-bold">{image.title}</h2>
          </div>
        </div>
      ))}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

