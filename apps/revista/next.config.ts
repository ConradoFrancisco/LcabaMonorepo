import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lcaba/ui", "@lcaba/services"],
};

export default nextConfig;
