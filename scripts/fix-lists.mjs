import { promises as fs } from "node:fs";
import path from "node:path";

const workspaceRoot = "C:/Users/fanun/Code/vermi.cl";
const blogDir = path.join(workspaceRoot, "src/content/blog");

function capitalizeFirstLetter(text) {
  // Find first alphabetic character
  const match = text.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/);
  if (match) {
    const idx = match.index;
    return text.slice(0, idx) + match[0].toUpperCase() + text.slice(idx + 1);
  }
  return text;
}

function cleanTrailingPunctuation(text) {
  let cleaned = text.trim();

  // Remove semicolons or commas at the very end (before formatting)
  cleaned = cleaned.replace(/[;,]\s*([*_`~]*)$/, "$1");

  // Word count check
  const plainText = cleaned.replace(/[*_`\[\]]/g, "").replace(/\([^)]+\)/g, "");
  const words = plainText.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  const isLong = wordCount >= 8;

  if (isLong) {
    if (
      !cleaned.match(/[.?!]["']?\s*$/) &&
      !cleaned.match(/[.?!]["']?[*_`~]*$/)
    ) {
      // Doesn't end with a period/punctuation. Append a period.
      cleaned += ".";
    }
  } else {
    // Short: should not end with period
    cleaned = cleaned.replace(/\.\s*([*_`~]*)$/, "$1");
  }

  return cleaned;
}

async function run() {
  console.log("Starting fixing lists in all blog posts...");
  const files = await fs.readdir(blogDir);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  for (const file of mdxFiles) {
    const filePath = path.join(blogDir, file);
    let content = await fs.readFile(filePath, "utf8");

    // Split by frontmatter and body
    const parts = content.split("---");
    if (parts.length < 3) {
      console.error(`Invalid structure in ${file}`);
      continue;
    }

    let frontmatter = parts[1];
    let body = parts.slice(2).join("---");

    // 1. Lowercase tags block in frontmatter to revert any accidental capitalization
    const tagsMatch = frontmatter.match(/tags:\s*\n((?:\s*-\s*\S+\s*\n?)+)/);
    if (tagsMatch) {
      const originalTagsText = tagsMatch[1];
      const lowercaseTagsText = originalTagsText.toLowerCase();
      frontmatter = frontmatter.replace(originalTagsText, lowercaseTagsText);
    }

    // 2. Process lists ONLY in the body
    const lines = body.split("\n");
    let modifiedCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const listMatch = line.match(/^(\s*[-\*\d+\.]+)\s+(.*)$/);
      if (listMatch) {
        const prefix = listMatch[1];
        const text = listMatch[2];

        // Skip tables, headers, dividers (e.g. ---)
        if (
          prefix.trim() === "---" ||
          prefix.trim() === "..." ||
          line.includes("|")
        ) {
          continue;
        }

        // Process text
        let capitalized = capitalizeFirstLetter(text);
        let cleanedText = cleanTrailingPunctuation(capitalized);

        const newLine = `${prefix} ${cleanedText}`;
        if (line !== newLine) {
          lines[i] = newLine;
          modifiedCount++;
        }
      }
    }

    body = lines.join("\n");
    const newContent = `---${frontmatter}---${body}`;
    await fs.writeFile(filePath, newContent, "utf8");
    console.log(
      `Processed ${file}: updated frontmatter and modified ${modifiedCount} list items in body.`,
    );
  }
  console.log("Lists successfully fixed across all articles!");
}

run().catch(console.error);
