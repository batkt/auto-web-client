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
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
