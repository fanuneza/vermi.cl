import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { getBlogTagLabel } from "../utils/blog-tags";
import { HOME_METADATA, formatPageTitle } from "../utils/site-metadata";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: formatPageTitle(HOME_METADATA.title),
    description: HOME_METADATA.description,
    site: context.site ?? "https://vermi.cl",
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      pubDate: post.data.pubDate,
      categories: [
        post.data.category,
        ...post.data.tags.map((tag) => getBlogTagLabel(tag)),
      ],
    })),
    customData: "<language>es-cl</language>",
  });
}
