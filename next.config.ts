import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mongoladventist.org",
      },
      {
        protocol: "https",
        hostname: "www.databridgemarketresearch.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "backend",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "103.143.40.184",
        port: "4001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "fixfab.mn",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.fixfab.mn",
        pathname: "/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
