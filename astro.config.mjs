import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import seoGraph from "@jdevalk/astro-seo-graph/integration";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import { unified } from "@astrojs/markdown-remark";
import remarkDirective from "remark-directive";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import { remarkAdmonitions } from "./src/utils/remark-admonitions.mjs";
import { rehypeExternalLinks } from "./src/utils/rehype-external-links.mjs";

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkAdmonitions, remarkReadingTime],
      rehypePlugins: [rehypeExternalLinks],
    }),
  },
  site: "https://vermi.cl",
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
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
    mdx(),
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: {
        skip: (href) =>
          href.startsWith("/api/") ||
          href.startsWith("/feed.xml") ||
          href.startsWith("/sitemap.xml") ||
          href.startsWith("/schemamap.xml") ||
          href.startsWith("/schema/"),
      },
      indexNow: {
        key: "591c2b87f0b68c44f260215f5d8e9da3",
        host: "vermi.cl",
        siteUrl: "https://vermi.cl",
      },
    }),
    compress({
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
          sortAttributes: false,
          sortClassName: false,
        },
      },
    }),
  ],
});
