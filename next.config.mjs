/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/ConverterApp', // Sesuaikan dengan nama repository
  assetPrefix: '/ConverterApp/', // Sesuaikan dengan nama repository
}

export default nextConfig
