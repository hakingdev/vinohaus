import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product images come from the Saleor instance (Cloud CDN or own S3).
    // Narrow this to the real hostname once the instance URL is known.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
