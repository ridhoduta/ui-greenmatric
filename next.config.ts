import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://apigm.satcloud.tech/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
