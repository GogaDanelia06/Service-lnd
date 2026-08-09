import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],

    deviceSizes: [640, 750, 828, 1080, 1200, 1500, 1920, 2048, 2560],
    imageSizes: [256, 384, 512, 640],
  },
  async redirects() {

    return [{ source: '/work', destination: '/', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
