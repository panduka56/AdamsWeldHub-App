/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['adamsgas.co.uk'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adamsgas.co.uk',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig 