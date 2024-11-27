import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width = 50, height = 40 }: LogoProps) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src="/images/logos/AG_CalcLogo2.svg"
        alt="Adams WeldHub Logo"
        width={width}
        height={height}
        priority
        className="dark:invert" // Inverts color in dark mode
      />
    </Link>
  )
} 