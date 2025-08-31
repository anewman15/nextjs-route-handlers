import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    domains: ["github.com"], // Add your allowed domains here
  },
};

export default nextConfig;
