import Logo from '@/app/components/Logo'
import { Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  products: [
    { name: 'Gas Calculator', href: '/' },
    { name: 'Product Catalog', href: '/products' },
    { name: 'Bulk Orders', href: '/products/bulk' },
    { name: 'Custom Solutions', href: '/products/custom' },
  ],
  resources: [
    { name: 'Safety Guidelines', href: '/resources/safety' },
    { name: 'Technical Docs', href: '/resources/docs' },
    { name: 'Gas Compatibility', href: '/resources/compatibility' },
    { name: 'Industry News', href: '/resources/news' },
  ],
  support: [
    { name: 'Contact Us', href: '/support/contact' },
    { name: 'FAQs', href: '/support/faq' },
    { name: 'Emergency Support', href: '/support/emergency' },
    { name: 'Training', href: '/support/training' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Logo width={80} height={64} className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                Adams<span className="text-[#FF8C42]">Gas</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400">
              Professional welding gas solutions and expertise for all your industrial needs.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, href: '#' },
                { Icon: Github, href: '#' },
                { Icon: Linkedin, href: '#' },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-gray-400 hover:text-[#FF8C42] transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-gray-900 dark:text-white font-semibold uppercase mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#FF8C42] 
                               dark:hover:text-[#FF8C42] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#FF8C42]/20">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AdamsGas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 