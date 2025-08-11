import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns:[
      {
        protocol:"https",
        hostname:"t3.ftcdn.net"
      },
      {
        protocol:"https",
        hostname:"cdn.pixabay.com"
      },
      {
        protocol:"https",
        hostname:"*"
      },
    ]
  },
};

export default nextConfig;
