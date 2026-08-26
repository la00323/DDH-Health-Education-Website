import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /guide 是改版前的舊路徑，可能已經被家長加到書籤或貼在 LINE 裡
      { source: "/guide", destination: "/", permanent: true },
      { source: "/guide/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
