import { gitLastmod } from "@jdevalk/astro-seo-graph";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getUsedBlogTags } from "../utils/blog-tags";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  const usedTags = getUsedBlogTags(posts);
  const siteUrl = "https://vermi.cl";

  const staticPages = [
    { path: "/", file: "src/pages/index.astro" },
    { path: "/blog/", file: "src/pages/blog/index.astro" },
    { path: "/nosotros/", file: "src/pages/nosotros.astro" },
    { path: "/contacto/", file: "src/pages/contacto.astro" },
    { path: "/privacidad/", file: "src/pages/privacidad.astro" },
  ];

  const urls = [
    ...staticPages.map((page) => {
      const gitDate = gitLastmod(page.file);
      const lastmod = gitDate
        ? gitDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
      return {
        loc: `${siteUrl}${page.path}`,
        changefreq:
          page.path === "/" || page.path === "/blog/" ? "weekly" : "monthly",
        priority:
          page.path === "/" ? "1.0" : page.path === "/blog/" ? "0.9" : "0.7",
        lastmod,
      };
    }),
    ...posts.map((post) => {
      const gitDate = gitLastmod(`src/content/blog/${post.id}.md`);
      const lastmod = gitDate
        ? gitDate.toISOString().split("T")[0]
        : post.data.pubDate
          ? new Date(post.data.pubDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];
      return {
        loc: `${siteUrl}/blog/${post.id}/`,
        changefreq: "monthly",
        priority: "0.8",
        lastmod,
      };
    }),
    ...usedTags.map((tag) => {
      const taggedPosts = posts.filter((post) =>
        post.data.tags.includes(tag.slug),
      );
      const latestPostDate = taggedPosts
        .map((post) => post.data.pubDate.valueOf())
        .sort((a, b) => b - a)[0];
      const gitDate = gitLastmod("src/pages/blog/tags/[tag].astro");
      const lastmod = gitDate
        ? gitDate.toISOString().split("T")[0]
        : new Date(latestPostDate || Date.now()).toISOString().split("T")[0];
      return {
        loc: `${siteUrl}/blog/tags/${tag.slug}/`,
        changefreq: "monthly",
        priority: "0.6",
        lastmod,
      };
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
