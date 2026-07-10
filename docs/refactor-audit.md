# Refactor Audit — vermi.cl

## Audit date

2026-07-10

## Baseline verification

| Command           | Result                                                     |
| ----------------- | ---------------------------------------------------------- |
| `git status`      | Clean working tree                                         |
| `npx astro check` | 0 errors, 0 warnings, 0 hints                              |
| `npx astro build` | Success; emits warnings about `/blog/tags/` internal links |
| `npm run test`    | Pass (`SEO build artifacts verified.`)                     |

## Dead and unused code

1. **`scripts/add-images.mjs`**, **`scripts/process-articles.mjs`**, **`scripts/fix-lists.mjs`**
   - Not referenced by `package.json` scripts.
   - Contain hardcoded local Windows paths (`C:/Users/fanun/...`) that violate the project's portability rule.
   - Appear to be one-off editorial migration scripts.
   - **Action:** Remove.

2. **`src/assets/images/vermi-logo.webp`**
   - Not referenced anywhere; logo is rendered as inline styled text.
   - **Action:** Remove.

3. **`chileanContext` field in `src/content.config.ts`**
   - Defined on the `alimentos` collection but never used by the API endpoint or the search component.
   - **Action:** Remove from schema and API output; drop keys from JSON files if present.

## Broken behavior

- **`src/components/Breadcrumbs.astro`** generates a link to `/blog/tags/` for the `tags` URL segment, but no page exists at that path. The SEO-graph integration warns about this on every build.
  - **Action:** Render the `tags` segment as plain text instead of a link.

## Duplication and DRY violations

1. Card rotation array `["rotate-[-1.5deg]", "rotate-[1deg]", "rotate-[-0.5deg]"]` duplicated in:
   - `src/pages/index.astro`
   - `src/pages/blog/index.astro`
   - `src/pages/blog/tags/[tag].astro`
   - **Action:** Centralize in `src/utils/blog-presentation.ts`.

2. Blog-card grid markup duplicated in the same three files.
   - **Action:** Create a shared `BlogCardGrid.astro` component.

3. Hardcoded arbitrary Tailwind color values duplicate existing theme tokens in multiple components.
   - **Action:** Replace with named theme classes where equivalent.

## Complexity and mixed responsibilities

1. **`src/layouts/BlogPostLayout.astro`** (~403 lines)
   - Mixes schema generation, related-post scoring, layout markup, share logic, and a custom sticky-sidebar scroll controller.
   - **Action:** Extract/simplify the sticky-sidebar script; keep share logic inline.

2. **`src/components/Header.astro`** (~366 lines)
   - Mixes navigation, mobile drawer, newsletter modal, and form submission logic.
   - **Action:** Optionally extract newsletter submission logic to `src/utils/newsletter-form.ts`.

## BEM migration candidates

The following project-owned CSS classes in `src/styles/global.css` can migrate to BEM. Manifest-mandated classes (`.organic-shape-*`, `.organic-brutalism*`, `.shadow-hard*`, `.px-margin`, `.py-stack-gap`, `.max-w-container`) must stay unchanged.

| Old selector         | Proposed BEM selector   |
| -------------------- | ----------------------- |
| `.blog-post-main`    | `.blog-layout__main`    |
| `.blog-post-article` | `.blog-layout__article` |
| `.blog-post-title`   | `.blog-layout__title`   |
| `.blog-post-sidebar` | `.blog-layout__sidebar` |
| `.editorial-body`    | `.prose`                |
| `.blog-toc`          | `.toc`                  |
| `.sticker-badge`     | `.badge--sticker`       |
| `.btn-brutal`        | `.btn--brutal`          |
| `.torn-border`       | `.border--torn`         |

## Deferred work

- No framework migration.
- No dependency upgrades.
- No redesign or visual changes.
- No change to public routes, query parameters, form fields, analytics, or structured data contracts.
