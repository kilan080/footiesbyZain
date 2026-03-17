import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "padab.com.ng" },
      { protocol: "https", hostname: "i5.walmartimages.com" },
      { protocol: "https", hostname: "ng.jumia.is" },
      { protocol: "https", hostname: "kozasko.com" },
      { protocol: "https", hostname: "seeandwear.com" },
      { protocol: "https", hostname: "img.kwcdn.com" },
      { protocol: "https", hostname: "tellme.ng" },
    ],


    qualities: [75],
  },
};


export default nextConfig;