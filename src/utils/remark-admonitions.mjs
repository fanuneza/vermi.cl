import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import { h as _h } from "hastscript";

// Supported types: tip, note, important, warning, danger, safe
const ADMONITION_TYPES = new Set([
  "tip",
  "note",
  "important",
  "warning",
  "danger",
  "safe",
]);

function isNodeDirective(node) {
  return (
    node.type === "containerDirective" ||
    node.type === "leafDirective" ||
    node.type === "textDirective"
  );
}

function h(el, attrs = {}, children = []) {
  const { properties, tagName } = _h(el, attrs);
  return {
    children,
    data: { hName: tagName, hProperties: properties },
    type: "paragraph",
  };
}

export function remarkAdmonitions() {
  return function (tree) {
    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined || !isNodeDirective(node)) return;
      if (node.type === "textDirective" || node.type === "leafDirective") {
        return; // we only care about containerDirectives like :::tip
      }

      const type = node.name.toLowerCase();
      if (!ADMONITION_TYPES.has(type)) return;

      let title = type.toUpperCase();
      let titleNode = [{ type: "text", value: title }];

      // Check if there is a custom title like :::tip[Mi Título]
      const firstChild = node.children[0];
      if (
        firstChild?.type === "paragraph" &&
        firstChild.data &&
        "directiveLabel" in firstChild.data &&
        firstChild.children.length > 0
      ) {
        titleNode = firstChild.children;
        title = mdastToString(firstChild.children);
        node.children.splice(0, 1);
      } else {
        // Default translated titles
        const titles = {
          tip: "Consejo",
          note: "Nota",
          important: "Importante",
          warning: "Advertencia",
          danger: "Evitar / No recomendado",
          safe: "Recomendado / Seguro",
        };
        title = titles[type] || title;
        titleNode = [{ type: "text", value: title }];
      }

      // Generate the organic brutalism wrapper classes based on admonition type
      // No hard shadow: admonitions render nested inside the shadow-hard .prose
      // container, so their own offset shadow would double it. The border carries the edge.
      let wrapperClasses = "admonition border-4 border-on-surface p-5 my-6 ";
      let titleClasses =
        "admonition-title font-headline text-lg font-black uppercase mb-2 flex items-center gap-2 ";
      let contentClasses =
        "admonition-content font-body text-sm leading-relaxed ";

      if (type === "safe") {
        wrapperClasses += "bg-safe-badge/10 organic-brutalism";
        titleClasses += "text-primary";
      } else if (type === "danger") {
        wrapperClasses += "bg-danger-badge/10 organic-brutalism-alt";
        titleClasses += "text-secondary";
      } else if (type === "warning") {
        wrapperClasses += "bg-warning-badge/10 organic-brutalism";
        titleClasses += "text-secondary";
      } else if (type === "tip") {
        wrapperClasses += "bg-background organic-brutalism-alt";
        titleClasses += "text-primary";
      } else {
        // default note / important
        wrapperClasses += "bg-surface-container organic-brutalism";
        titleClasses += "text-on-surface";
      }

      // We can also prepend an emoji to the title based on type
      const emojis = {
        tip: "💡",
        note: "📝",
        important: "📌",
        warning: "⚠️",
        danger: "❌",
        safe: "✅",
      };
      const emoji = emojis[type] || "📌";
      titleNode.unshift({ type: "text", value: `${emoji} ` });

      const admonition = h(
        "aside",
        {
          "aria-label": title,
          class: wrapperClasses,
          "data-admonition-type": type,
        },
        [
          h("p", { class: titleClasses, "aria-hidden": "true" }, [
            ...titleNode,
          ]),
          h("div", { class: contentClasses }, node.children),
        ],
      );

      parent.children[index] = admonition;
    });
  };
}
