import type { NextConfig } from "next";

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://apigm.satcloud.tech';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${BACKEND_API_URL}/api/v1/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${BACKEND_API_URL}/uploads/:path*`,
      },
      {
        source: '/public/evidences/:path*',
        destination: `${BACKEND_API_URL}/public/evidences/:path*`,
      },
      {
        source: '/storage/:path*',
        destination: `${BACKEND_API_URL}/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
