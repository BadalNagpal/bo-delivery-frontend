import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate HTML/CSS/JS assets for deployment to Tomcat or another static host.
  output: "export",

  // Emit each route as a directory containing index.html (for example,
  // /receipt-generator/index.html), which Tomcat can serve directly.
  trailingSlash: true,
  basePath: "/bo-delivery-test",

  experimental: {
    agentFeedback: true,
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
