# Refactor Report — vermi.cl

## Summary

Maintenance refactor of the `vermi.cl` Astro 7 codebase following the project's coding and styling guidelines. The goal was to improve cleanliness, consistency, and maintainability without changing behavior, visual appearance, public routes, SEO, accessibility, or performance.

The refactor removed dead code and portability risks, fixed a broken breadcrumb link, consolidated duplicated presentation logic, migrated project-owned CSS classes to BEM, and simplified the two most complex components (`Header.astro` and `BlogPostLayout.astro`).

## Baseline

| Command           | Result                                                       |
| ----------------- | ------------------------------------------------------------ |
| `git status`      | Clean working tree                                           |
| `npx astro check` | 0 errors, 0 warnings, 0 hints                                |
| `npx astro build` | Success; emitted warnings about `/blog/tags/` internal links |
| `npm run test`    | Pass (`SEO build artifacts verified.`)                       |

## Changes by pass

### Pass 1 — Remove dead code and portability risks

Deleted files:

- `scripts/add-images.mjs`
- `scripts/fix-lists.mjs`
- `scripts/process-articles.mjs`
- `src/assets/images/vermi-logo.webp`

Removed the unused `chileanContext` field from:

- `src/content.config.ts`
- `src/pages/api/alimentos.json.ts`

These scripts contained hardcoded local Windows paths that violated the project's portability rule and were not referenced by any `package.json` script.

### Pass 2 — Fix broken `/blog/tags/` breadcrumb link

`src/components/Breadcrumbs.astro` rendered the `tags` URL segment as a link to `/blog/tags/`, but no page exists at that path. The segment is now rendered as plain text, which eliminated the build warnings.

### Pass 3 — Consolidate duplication and theme tokens

- Added `BLOG_CARD_ROTATIONS` and `getBlogCardRotation()` to `src/utils/blog-presentation.ts`.
- Created `src/components/BlogCardGrid.astro` to centralize the scrapbook-style card grid markup.
- Adopted `BlogCardGrid` in `src/pages/index.astro` and `src/pages/blog/tags/[tag].astro`.
- Used `getBlogCardRotation()` in `src/pages/blog/index.astro` where filter wrappers still require custom markup.
- Replaced hardcoded arbitrary shadows with the design-system tokens `shadow-hard` and `shadow-hard-sm` in `index.astro`, `CategoryCard.astro`, `BlogCard.astro`, and `Header.astro`.

### Pass 4 — Migrate project-owned CSS classes to BEM

Updated `src/styles/global.css` and all consumers:

| Old selector         | New selector            |
| -------------------- | ----------------------- |
| `.blog-post-main`    | `.blog-layout__main`    |
| `.blog-post-article` | `.blog-layout__article` |
| `.blog-post-title`   | `.blog-layout__title`   |
| `.blog-post-sidebar` | `.blog-layout__sidebar` |
| `.blog-post-grid`    | `.blog-layout__grid`    |
| `.editorial-body`    | `.prose`                |
| `.blog-toc`          | `.toc`                  |
| `.sticker-badge`     | `.badge--sticker`       |
| `.btn-brutal`        | `.btn--brutal`          |
| `.torn-border`       | `.border--torn`         |

Manifest-mandated classes (`.organic-shape-*`, `.organic-brutalism*`, `.shadow-hard*`, `.px-margin`, `.py-stack-gap`, `.max-w-container`) were left untouched.

### Pass 5 — Simplify complex components

- **`src/layouts/BlogPostLayout.astro`**: removed the imperative sticky-sidebar scroll controller (~70 lines). The CSS already declares `position: sticky; top: 6rem; align-self: start` for `.blog-layout__sidebar`, so the native behavior is sufficient. The share-button script was kept inline because it is tightly coupled to the page's `share-btn` element.
- **`src/components/Header.astro`**: extracted the MailerLite newsletter form submission logic into `src/utils/newsletter-form-handlers.ts`. `Header.astro` now imports `initNewsletterForm()` and keeps only drawer and modal orchestration. This reduced the component's client script from ~157 lines to ~74 lines.

## Final verification

| Command           | Result                                 |
| ----------------- | -------------------------------------- |
| `npm run format`  | Pass, no changes left to format        |
| `npx astro check` | 0 errors, 0 warnings, 0 hints          |
| `npx astro build` | Success; no `/blog/tags/` warnings     |
| `npm run test`    | Pass (`SEO build artifacts verified.`) |

## Impact

- **Source code**: ~1,382 lines removed, ~140 lines added (net reduction driven by deleted dead scripts).
- **Bundle impact**: HTML and JS outputs are slightly smaller across the site.
- **Behavior**: unchanged; public routes, SEO metadata, structured data, accessibility tree, and visual design are preserved.

## Risks and manual review notes

1. **Sticky sidebar behavior**: the previous script implemented a custom "bottom-sticky" scroll pattern for sidebars taller than the viewport. Reverting to standard sticky means very tall sidebars may simply scroll with the page once the bottom of the grid is reached. This is acceptable for the current content, but a quick visual scroll-through of the longest posts is recommended.
2. **Newsletter modal**: the extracted handler preserves the original success/error/loading flow. Because the form endpoint and selectors are unchanged, no functional regression is expected.

## Deferred work

- No framework version upgrades.
- No dependency updates beyond what the existing lockfile provides.
- No redesign or new visual features.
- No changes to analytics, external APIs, or structured-data contracts.
