import { createSchemaMap } from "@jdevalk/astro-seo-graph";
import { gitLastmod } from "@jdevalk/astro-seo-graph";

export const GET = createSchemaMap({
  siteUrl: "https://vermi.cl",
  entries: [
    {
      path: "/schema/post.json",
      lastModified: gitLastmod("src/pages/schema/post.json.ts") || new Date(),
    },
  ],
});
