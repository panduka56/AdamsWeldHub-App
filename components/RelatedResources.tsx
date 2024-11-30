import Link from 'next/link'

type RelatedLinks = {
  [key: string]: Array<{
    href: string;
    text: string;
  }>;
}

interface RelatedResourcesProps {
  currentPage: keyof RelatedLinks;
}

export default function RelatedResources({ currentPage }: RelatedResourcesProps) {
  const relatedLinks: RelatedLinks = {
    'gas-calculator': [
      { href: '/resources/materials-guide', text: 'Materials Guide' },
      { href: '/resources/gas-flow-chart', text: 'Gas Flow Chart' }
    ]
  }
  
  return (
    <div className="mt-8">
      <h2>Related Resources</h2>
      <ul>
        {relatedLinks[currentPage]?.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 