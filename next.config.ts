import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HYGRAPH_API_TOKEN: process.env.HYGRAPH_API_TOKEN,
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ap-south-1.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org",
      },
      {
        protocol: "https",
        hostname: "ap-south-1.cdn.hygraph.com",
      },
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },
    ],
  },
};

export default nextConfig;
