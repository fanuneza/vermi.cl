# Agent Guidance - vermi.cl

Welcome to the `vermi.cl` codebase. This site is a static Astro 7 educational hub about worm composting (lombricultura) in Chile, deployed to Cloudflare Pages. It is optimized for absolute performance (perfect 100/100 Lighthouse score), clean SEO, and AI searchability.

Please respect the following rules at all times.

---

## 1. Opening Moves & MCP Workflow
- **Astro Docs MCP**: Always query the `astro-docs` MCP for framework details, loaders, static prerendering, and current best practices.
- **jCodeMunch MCP**: You **MUST** use the `jcodemunch` MCP to index files whenever you analyze, create, or modify source code in this repository.
  * Start your session with `resolve_repo { "path": "." }` to check the index. If it is not indexed, run `index_folder { "path": "." }`.
  * After editing, call `register_edit` or re-index with `index_file` so the symbols index remains current.
  * Prefer jCodeMunch code navigation (`search_symbols`, `get_file_tree`, `find_references`) over raw string searches.

---

## 2. Technical Stack Defaults
- **Astro Static Output**: Purely pre-rendered HTML pages (`output: 'static'`).
- **npm**: With committed `package-lock.json`.
- **Cloudflare Pages**: Deployed via GitHub integrations.
- **Wrangler / KV**: Local Wrangler configurations live in `.wrangler/` (do not track in Git).
- **CSS**: Pure custom, Vanilla CSS. **DO NOT** install or use Tailwind CSS or any heavy CSS framework.

---

## 3. Styling & Neo-Brutalist Manifest
All visual elements must conform to the **Neo-Brutalist Organic Zine / Handcrafted Farmer's Journal** manifest:
*   **Sharp Corners**: `border-radius: 0px` strictly for all cards, panels, and buttons.
*   **Thick Borders**: Constant `3px solid var(--color-ink)` (where ink is `#111111`).
*   **Orthogonal Shadows**: `box-shadow: 4px 4px 0px 0px var(--color-ink)`.
*   **Translation Hovers**: `transform: translate(2px, 2px)` coupled with diminished shadow `2px 2px 0px 0px var(--color-ink)` for interactive elements.
*   **Palette Rules**: Use the semantic custom properties in `src/styles/global.css`:
    - Canvas Background: `--color-bg-warm` (`#FFFDF0`)
    - Foreground Ink: `--color-ink` (`#111111`)
    - Terracotta Accent: `--color-terracotta` (`#D2691E`)
    - Forest Green: `--color-forest` (`#1E3C2B`)
    - Warning Yellow: `--color-mustard` (`#E6C229`)
    - Crimson Danger: `--color-crimson` (`#C81D25`)

---

## 4. Code Standards & Aliases
- **DRY Modules**: Extract duplicated schemas, metadata models, and DOM helpers into small reusable utilities.
- **Imports Alias**: Use the `@/*` alias for imports inside `src/`. Astro resolves these through `tsconfig.json`.
- **framework Entrypoints**: Do not delete pages, layouts, or config files simply because static analysis tools mark them unreachable.
- **Icon Assets**: Prefer inline SVGs over external font-awesome CDNs or font loader bundles to guarantee maximum loading speed.

---

## 5. SEO, Accessibility, and Performance
- **Perfect 100 score**: Audit all changes to guarantee a perfect 100/100 Lighthouse score (Performance, Accessibility, Best Practices, SEO).
- **Semantic HTML5**: Ensure proper landmark hierarchy (`<header>`, `<main>`, `<article>`, `<aside>`, `<footer>`) with a single `<h1>` per page.
- **JSON-LD Schema**: Integrate correct structured Schema.org blocks (e.g. `BlogPosting` for guides, `WebSite` for homepage, and `ProfilePage` for authors). Shared entities must come from a typed graph builder rather than duplicate page strings.
- **AI search engine compatibility**: Maintain `/feed.xml` RSS and keep `/llms.txt` and `/llms-full.txt` updated at the root public folder.
- **Images**: Always specify dimensions (`width`/`height`) on `<img>` tags. The LCP hero image must not be lazy-loaded.

---

## 6. Security & Cloudflare Headers
- **Cloudflare Headers**: Maintaining `public/_headers` is required to ensure an A+ rating on securityheaders.com.
- **Security Protections**: Ensure HSTS, Frameguard, Content Security Policy (CSP), permissions-policy, and referrer-policy are configured strictly.
- **Redirects**: Maintain URL migrations inside `public/_redirects`.

---

## 7. Voice, Tone, and Copywriting
- **Guidelines**: Refer to `docs/voice_and_tone.md` before generating or editing content.
- **Chilean Spanish**: Content must use natural Chilean Spanish "tuteo" (e.g., "Aprende", "Tu vermi", "¡Wena!"). Use correct accents and grammar.
- **Scientific Grounding**: Explain biological concepts (Eisenia fetida, metabolic lethargy, overfeeding, acidification) scientifically to resolve user anxiety and mitigate the "factor repulsivo".
- **Encoding**: All files must be UTF-8. Never introduce mojibake or corrupted accent sequences.

---

## 8. Verification Checks
Before making a commit, run:
```bash
npx astro check
npm run build
```
Document any skipped checks and explain the reasoning.
