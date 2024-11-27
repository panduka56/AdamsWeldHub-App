export interface Product {
  Title: string
  Content: string
  'Image URL': string
  'Product Categories': string
  Slug: string
  categories: string[]
  details?: {
    gasType?: string
    cylinderSize?: string
    pressure?: string
    gasVolume?: string
    dimensions?: string
    compatibility?: string
  }
  features?: string[]
  applications?: string[]
  specifications?: string[]
  safetyInfo?: string
}

export interface ProductCategory {
  name: string
  slug: string
  parent?: string
}

export interface Material {
  id: string
  name: string
  overview: string
  properties: {
    density: string
    meltingPoint: string
    yieldStrength: string
    weldability: string
  }
  applications: string[]
  weldingRecommendations: {
    process: string
    shieldingGas: string
    tips: string[]
  }
  additionalNotes: string
}

export interface SafetyTip {
  id: string;
  title: string;
  content: string;
  // ... any other existing properties
} 