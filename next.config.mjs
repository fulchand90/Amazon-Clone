/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'  // Allow all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**'  // Allow all HTTP domains (if needed)
      }
    ]
  }
}

export default nextConfig
