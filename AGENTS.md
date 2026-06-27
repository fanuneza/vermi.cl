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
- **Cloudflare Pages**: Deployed via GitHub integrations. The build command `npm run build` outputs directly to the `/dist` directory.
- **No Astro Adapter**: Do **NOT** configure or install any adapter (like `@astrojs/cloudflare`) in `astro.config.mjs`. Because the project is static, the adapter splits the output into `/dist/client/`, which breaks Cloudflare Pages' root integration and causes 404 errors.
- **Wrangler**: Local Wrangler configurations live in `.wrangler/` (do not track in Git).
- **CSS / Styling**: Built using **Tailwind CSS v4** (via `@tailwindcss/vite`) combined with custom Vanilla CSS utilities. Do **NOT** install heavy UI libraries or component kits.

---

## 3. Styling & Organic-Brutalism Zine Manifest
All visual elements must conform to the **Organic-Brutalism Eco-Zine / Handcrafted Scrapbook** manifest defined in Stitch.
*   **Tailwind CSS**: Use Tailwind CSS utility classes matching the Stitch designs exactly. Tailwind is compiled at build-time to ensure a perfect 100/100 Lighthouse performance score.
*   **Organic Corners**: Handled via custom utility classes:
    - `.organic-shape-1`: `border-radius: 60px 20px 50px 30px` (hero image)
    - `.organic-shape-2`: `border-radius: 30px 50px 20px 40px` (portal cards, stickers)
    - `.organic-shape-3`: `border-radius: 20px 60px 40px 20px` (compostable search widget)
    - `.organic-brutalism`: `border-radius: 4px 16px 8px 24px` (card blocks, wrappers)
    - `.organic-brutalism-alt`: `border-radius: 12px 4px 20px 8px` (details, comments)
*   **Borders & Shadows**:
    - Custom borders: use standard Tailwind borders or `.border-4` / `.border-2` solid `#002201`.
    - Custom hard shadows: use `.shadow-hard` (`6px 6px 0px 0px #002201`) or `.shadow-hard-sm` (`4px 4px 0px 0px #002201`).
*   **Palette Rules**: Use the mapped colors in `tailwind.config.mjs` (or defined in Tailwind CSS variables):
    - Canvas Background: `bg-background` (`#ecffe2`)
    - Foreground Ink: `text-on-background` (`#002201`)
    - Forest Green Accent: `text-primary` / `bg-primary` (`#0f5238`)
    - Terracotta Accent: `text-secondary` / `bg-secondary` (`#a0401f`)
    - Earth Brown: `text-tertiary` / `bg-tertiary` (`#52453a`)
    - Warning/Mustard Yellow: `bg-warning-badge` (`#F0C842` / `bg-mustard` `#e9d7c8`)
    - Safe/Green Badge: `bg-safe-badge` (`#59C985`)
    - Danger/Red Badge: `bg-danger-badge` (`#E05353`)
*   **Typography**:
    - Headlines/Display: `font-headline` (`Bricolage Grotesque`)
    - Body Text: `font-body-md` / `font-body-lg` (`Fira Sans` for UI, `Merriweather` for articles)
    - Labels/Mono: `font-label-md` (`Space Mono`)

---

## 4. Code Standards & Aliases
- **DRY Modules**: Extract duplicated schemas, metadata models, and DOM helpers into small reusable utilities.
- **Imports Alias**: Use the `@/*` alias for imports inside `src/`. Astro resolves these through `tsconfig.json`.
- **framework Entrypoints**: Do not delete pages, layouts, or config files simply because static analysis tools mark them unreachable.
- **Icon Assets**: Prefer inline SVGs over external font-awesome CDNs or font loader bundles to guarantee maximum loading speed.
- **Never Use Local Paths**: NEVER use absolute local paths (e.g., `file:///C:/Users/...` or `C:\Users\...`) inside any project files, codebase comments, configuration files, or guidelines in the repository. Always use repository-relative paths instead (e.g., `src/content/alimentos/` or `src/content.config.ts`) to prevent exposing local usernames and ensure full project portability across all environments.

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
- **Chilean Spanish**: Content must use natural Chilean Spanish "tuteo" (e.g., "Aprende", "Tu vermi", "Comienza"). Use correct accents and grammar.
- **Scientific Grounding**: Explain biological concepts (Eisenia fetida, metabolic lethargy, overfeeding, acidification) scientifically to resolve user anxiety and mitigate the "factor repulsivo".
- **No Periods on Titles**: Heading elements (H1, H2, H3, H4) and page/article titles must never end in a period.
- **Spanish Title Capitalization**: All heading elements (H1, H2, H3, H4) and page/article titles must follow Spanish title capitalization styling (sentence case). Only capitalize the first word and proper nouns (e.g. use "Manual de inicio" instead of "Manual de Inicio", "Solución de problemas" instead of "Solución de Problemas"). Do not use English title case.
- **Encoding**: All files must be UTF-8. Never introduce mojibake or corrupted accent sequences.

---

## 8. Verification Checks
Before making a commit, run:
```bash
npx astro check
npm run build
```
Document any skipped checks and explain the reasoning.

---

## 9. Food Search Database ("¿Le puedo echar esto?")
The interactive food search on the homepage uses a client-side search index generated from local JSON files:
- **Data Location**: JSON entries reside in `src/content/alimentos/` (e.g., `platano.json`, `cafe.json`).
- **Schema & Validation**: Defined in `src/content.config.ts`. The schema fields are:
  * `name` (string): Common Chilean name (sentence case).
  * `category` (string): Group label (e.g. "Húmedo / Frutas", "Seco / Carbono").
  * `status` (enum: `'safe'`, `'warning'`, `'danger'`): Composting safety level.
  * `instructions` (string): Handling advice.
  * `nutrition` (string, optional): Plant-relevant nutrients details.
- **Endpoint**: `src/pages/api/alimentos.json.ts` maps and compiles these files into a single indexable static JSON array at build time.
- **Search Component**: `src/components/IsItCompostable.astro` fetches the API endpoint, performs accent-insensitive search logic, and renders the result card.

### Rules for Adding New Food Entries
1.  **Scientific Grounding**: All claims, safety classifications, and instructions must be backed by scientific research. Explain the biological *why* (e.g., cell wall breakdown in freezing, azufrado oil irritation, anaerobic putrefaction).
2.  **Nutritional Profiles**: Every edible entry must include the `nutrition` field mapping NPK values or key soil nutrients (Nitrogen, Potassium, Phosphorus, Calcium, Carbon, Sulfur) and explain which part of plant development they enhance (foliar growth, flowering, roots, etc.).
3.  **Local Context Integration**: The copy must use natural Chilean Spanish ("tuteo") and naturally weave in the Chilean domestic context (e.g., waste from asados, pebre, orange peel tea, palta abundancy) inside the `instructions` paragraph.
4.  **Scientific Name Formatting**: Wrap scientific names in single asterisks (e.g. `*Eisenia fetida*`). The frontend component escapes HTML and parses these specifically into `<i>` tags. Do not write raw HTML.
5.  **Capitalization & Punctuation**: Food names should follow Spanish sentence case (only capitalize the first letter and proper nouns, e.g. "Borra de café"). Instructions and nutrition copy must be complete sentences ending in periods, but titles/names must not.
