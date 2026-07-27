import type { NextConfig } from "next";

<<<<<<< HEAD
const nextConfig: NextConfig = {};
=======
const nextConfig: NextConfig = {
  // @ts-expect-error: NextConfig type might be missing this field but it works
  eslint: {
    ignoreDuringBuilds: true,
  },
};
>>>>>>> 3446f2eaee5fcbc1426e157e7f4ba4bc9a484d65

export default nextConfig;
