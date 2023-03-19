/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = withPWA({
  reactStrictMode: true,
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nft-cdn.alchemy.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false }
    }
    return config
  },
})

module.exports = nextConfig
