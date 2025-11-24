import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // http or https
        hostname: "github.com", // domain name
      },
      {
        protocol: "https", // http or https
        hostname: "avatars.githubusercontent.com", // domain name
      },
    ], // Add your allowed domains here
  },
};

export default nextConfig;
