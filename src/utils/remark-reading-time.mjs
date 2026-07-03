import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const wordCount = textOnPage.split(/\s+/).filter(Boolean).length;
    // Average reading speed: 200 words per minute
    const readingTime = Math.ceil(wordCount / 200);

    if (file && file.data && file.data.astro && file.data.astro.frontmatter) {
      file.data.astro.frontmatter.readingTime = `${readingTime} min`;
    }
  };
}
