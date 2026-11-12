import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Dev only: let phones and tablets on the same Wi-Fi open the dev server (e.g. http://192.168.1.7:3800)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  partialPrefetching: true,
  experimental: { agentUpgrade: "security" },
  async redirects() {
    return [{ source: "/about", destination: "/studio", permanent: true }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
