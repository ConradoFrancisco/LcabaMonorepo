import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lcaba/ui"],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
