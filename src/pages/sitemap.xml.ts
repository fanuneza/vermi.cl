import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  const siteUrl = "https://vermi.cl";

  const staticPages = [
    "",
    "/blog",
    "/nosotros",
    "/contacto",
    "/sustentabilidad",
    "/privacidad",
  ];

  const urls = [
    ...staticPages.map((page) => ({
      loc: `${siteUrl}${page}`,
      changefreq: page === "" || page === "/blog" ? "weekly" : "monthly",
      priority: page === "" ? "1.0" : page === "/blog" ? "0.9" : "0.7",
      lastmod: new Date().toISOString().split("T")[0],
    })),
    ...posts.map((post) => ({
      loc: `${siteUrl}/blog/${post.id}`,
      changefreq: "monthly",
      priority: "0.8",
      lastmod: post.data.pubDate
        ? new Date(post.data.pubDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    })),
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
