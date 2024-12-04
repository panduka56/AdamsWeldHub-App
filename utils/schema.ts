import { Product } from '@/types/product'

export const generateProductSchema = (product: Product) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.Title,
    description: product.Content,
    sku: product.ID,
    category: product.ProductCategories[0],
    image: product.ImageURL,
    brand: {
      '@type': 'Brand',
      name: 'AdamsGas'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'GBP',
      seller: {
        '@type': 'Organization',
        name: 'AdamsGas'
      }
    }
  }
}

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AdamsGas',
    url: 'https://adamsgas.com',
    logo: 'https://adamsgas.com/images/logos/AG_CalcLogo2.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-XXX-XXXX',
      contactType: 'customer service'
    }
  }
} 