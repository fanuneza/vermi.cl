import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import seoGraph from "@jdevalk/astro-seo-graph/integration";

export default defineConfig({
  site: "https://vermi.cl",
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  },
  integrations: [
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: {
        skip: (href) =>
          href.startsWith("/api/") ||
          href.startsWith("/feed.xml") ||
          href.startsWith("/sitemap.xml"),
      },
    }),
  ],
});
