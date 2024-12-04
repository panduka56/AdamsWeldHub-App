/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adamsgas.co.uk',
        pathname: '/wp-content/uploads/**',
      },
    ],
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }
}

module.exports = nextConfig 