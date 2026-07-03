import { createMarkdownEndpoint } from "@jdevalk/astro-seo-graph";
import { getBlogPosts } from "../../utils/blog";

export const getStaticPaths = async () => {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ params: { slug: p.id } }));
};

export const GET = createMarkdownEndpoint({
  entries: () => getBlogPosts(),
  mapper: (post, slug) =>
    post.id !== slug
      ? null
      : {
          frontmatter: {
            title: post.data.title,
            canonical: `https://vermi.cl/blog/${post.id}/`,
            pubDate: post.data.pubDate,
            author: post.data.author,
            description: post.data.description,
            category: post.data.category,
            tags: post.data.tags,
          },
          body: post.body ?? "",
        },
});
