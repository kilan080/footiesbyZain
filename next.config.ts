import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
     
    ],

    qualities: [75],
  },
};

export default nextConfig;