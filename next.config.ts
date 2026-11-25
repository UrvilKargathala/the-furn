import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Dev only: let phones and tablets on the same Wi-Fi open the dev server (e.g. http://192.168.1.7:3800)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  partialPrefetching: true,
  experimental: { agentUpgrade: "security" },
  async redirects() {
    return [
      { source: "/about", destination: "/studio", permanent: true },
      // Old Framer project names that were duplicates of the Drive projects
      { source: "/works/aestra", destination: "/works/statuario-blanc", permanent: true },
      { source: "/works/noir-arc", destination: "/works/torrent-grey", permanent: true },
      { source: "/works/ivory", destination: "/works/vapour-mist", permanent: true },
      { source: "/works/globcon-oasis", destination: "/works/honed-aggregate", permanent: true },
      // Original project names, renamed November 2026
      { source: "/works/pcube", destination: "/works/graphite-monolith", permanent: true },
      { source: "/works/timber-arch", destination: "/works/cashmere-oak", permanent: true },
      { source: "/works/avadh-ayuska", destination: "/works/amber-travertine", permanent: true },
      { source: "/works/casa-rivera", destination: "/works/torrent-grey", permanent: true },
      { source: "/works/snowera", destination: "/works/statuario-blanc", permanent: true },
      { source: "/works/palladium", destination: "/works/titanium-marquina", permanent: true },
      { source: "/works/globcon", destination: "/works/honed-aggregate", permanent: true },
      { source: "/works/greenopolish", destination: "/works/sage-calacatta", permanent: true },
      { source: "/works/setu-villa", destination: "/works/ochre-plinth", permanent: true },
      { source: "/works/atmosphere", destination: "/works/vapour-mist", permanent: true },
      { source: "/works/shreepad", destination: "/works/ivory-heritage", permanent: true },
      { source: "/works/gokuldham", destination: "/works/laurent-noir", permanent: true },
    ];
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
