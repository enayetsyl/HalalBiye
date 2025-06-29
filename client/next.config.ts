import type { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  // 1️⃣  Proxy API calls → backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',                 // any request that starts with /api
        destination: 'https://halal-biye-u9ic.vercel.app/api/:path*',
      },
    ];
  },

  // 2️⃣  (Optional) CORS-friendly headers for local dev or other tools
  //     Safe because the request is now same-origin in production.
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://halal-biye.vercel.app' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },

  // 3️⃣  Any other Next.js options go here
  reactStrictMode: true,
  // experimental: { runtime: 'edge' }   ← only if you later move to edge runtime
};

export default nextConfig;
