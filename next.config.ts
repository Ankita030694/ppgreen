import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error: NextConfig type might be missing this field but it works
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
