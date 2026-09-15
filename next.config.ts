import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.metmuseum.org" },
      { protocol: "https", hostname: "openaccess-cdn.clevelandart.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
    ],
  },
};

export default nextConfig;
