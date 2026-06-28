import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const rssItems = sortedPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>https://vermi.cl/blog/${post.id}</link>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <guid>https://vermi.cl/blog/${post.id}</guid>
    </item>
  `,
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>vermi.cl - Lombricultura en Chile</title>
    <description>Aprende vermicompostaje doméstico, reducción de residuos orgánicos y biología del suelo chileno.</description>
    <link>https://vermi.cl</link>
    <atom:link href="https://vermi.cl/feed.xml" rel="self" type="application/rss+xml"/>
    <language>es-cl</language>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
