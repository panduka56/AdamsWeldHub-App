import Link from 'next/link'

interface BreadcrumbProps {
  items: {
    label: string
    href: string
  }[]
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `https://adamsgas.com${item.href}`,
        name: item.label
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              <Link 
                href={item.href}
                className="text-[#FF8C42] hover:text-[#FF8C42]/80"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
} 