import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://footies-backend.vercel.app/'
  }
};

export default nextConfig;
