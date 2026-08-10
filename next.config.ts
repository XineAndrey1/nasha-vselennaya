
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // basePath: '/nasha-vselennaya', // ← ВРЕМЕННО ОТКЛЮЧАЕМ
}

module.exports = nextConfig