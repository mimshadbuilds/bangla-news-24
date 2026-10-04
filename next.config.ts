import path from "node:path";
import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { hostname } from "node:os";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk"
      }
    ]
  },
  
  turbopack: {
    root: projectRoot,
  },

};

export default nextConfig;
