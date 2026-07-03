import { visit } from "unist-util-visit";

export function rehypeExternalLinks() {
  return function (tree) {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "a" &&
        node.properties &&
        typeof node.properties.href === "string"
      ) {
        const href = node.properties.href;

        // Match absolute HTTP/HTTPS links, but exclude our own domain
        const isExternal =
          href.startsWith("http://") || href.startsWith("https://");
        const isSelf =
          href.includes("vermi.cl") ||
          href.includes("localhost") ||
          href.startsWith("/");

        if (isExternal && !isSelf) {
          // Force opening in a new tab/window for external links
          node.properties.target = "_blank";

          // Determine SEO rel attribute.
          // Link juice (no nofollow) is preserved only for high-authority scientific/governmental portals.
          const isHighAuthority =
            href.includes(".edu") ||
            href.includes(".gov") ||
            href.includes(".gob") ||
            href.includes("researchgate.net") ||
            href.includes("doi.org") ||
            href.includes("scielo.org") ||
            href.includes("wikipedia.org");

          const rels = ["noopener", "noreferrer"];
          if (!isHighAuthority) {
            rels.push("nofollow");
          }

          node.properties.rel = rels.join(" ");

          // Accessibility: append a screen-reader only label indicating a new tab opens
          if (node.children && node.children.length > 0) {
            node.children.push({
              type: "element",
              tagName: "span",
              properties: { class: "sr-only" },
              children: [
                { type: "text", value: " (abre en una nueva pestaña)" },
              ],
            });
          }
        }
      }
    });
  };
}
