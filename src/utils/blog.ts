import { getCollection, render } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog"> & {
  readingTime: string;
};

let _postsCache: BlogPost[] | null = null;

/**
 * Fetches all blog posts, resolves their reading time (from frontmatter or dynamic calculation),
 * and returns them sorted by publication date descending.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (_postsCache) {
    return _postsCache;
  }

  const rawPosts = await getCollection("blog");

  const postsWithMetadata: BlogPost[] = await Promise.all(
    rawPosts.map(async (post) => {
      // Use frontmatter readingTime if explicitly provided, otherwise dynamically render to compute it
      let readingTime = post.data.readingTime;

      if (!readingTime) {
        try {
          const rendered = await render(post);
          readingTime =
            rendered.remarkPluginFrontmatter?.readingTime || "5 min";
        } catch (e) {
          readingTime = "5 min";
        }
      }

      return {
        ...post,
        readingTime: readingTime || "5 min",
      };
    }),
  );

  // Sort posts by pubDate descending
  _postsCache = postsWithMetadata.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return _postsCache;
}

/**
 * Returns the latest N blog posts.
 */
export async function getLatestPosts(count = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, count);
}

/**
 * Finds related blog posts for a given post based on category and tags.
 * Category match: +5 points
 * Tag match: +1 point per tag
 */
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  maxResults = 3,
): BlogPost[] {
  const currentTags = new Set(currentPost.data.tags);

  return allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      let score = 0;

      // Category match yields high similarity
      if (post.data.category === currentPost.data.category) {
        score += 5;
      }

      // Shared tags increase score
      if (post.data.tags) {
        post.data.tags.forEach((tag) => {
          if (currentTags.has(tag)) {
            score += 1;
          }
        });
      }

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf(),
    )
    .slice(0, maxResults)
    .map((item) => item.post);
}
