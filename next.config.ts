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
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "www.zannimadeinitaly.com" },
      { protocol: "https", hostname: "s.alicdn.com" },
      { protocol: "https", hostname: "sc04.alicdn.com" },
      { protocol: "https", hostname: "cdn.rehmie.com.ng" },
      { protocol: "https", hostname: "www.adelisaandco.com" },
    ],


    qualities: [75],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co https://checkout.paystack.com",
              "frame-src 'self' https://checkout.paystack.com",
              "img-src 'self' data: blob: https:",
              "style-src 'self' 'unsafe-inline' https://checkout.paystack.com",
              "connect-src 'self' http://localhost:4000 https://api.paystack.co https://checkout.paystack.com",
              "font-src 'self' https://checkout.paystack.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};


export default nextConfig;