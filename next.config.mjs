/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Nonaktifkan optimasi gambar agar kompatibel dengan statis
  },
  output: 'export',
}

export default nextConfig
