# Agent Guidance - vermi.cl

Welcome to the `vermi.cl` codebase. This site is a static Astro 7 educational hub about worm composting (lombricultura) in Chile, deployed to Cloudflare Pages. It is optimized for absolute performance (perfect 100/100 Lighthouse score), clean SEO, and AI searchability.

Please respect the following rules at all times.

---

## 1. Opening Moves & MCP Workflow

- **Astro Docs MCP**: Always query the `astro-docs` MCP for framework details, loaders, static prerendering, and current best practices.
- **jCodeMunch MCP**: You **MUST** use the `jcodemunch` MCP to index files whenever you analyze, create, or modify source code in this repository.
  - Start your session with `resolve_repo { "path": "." }` to check the index. If it is not indexed, run `index_folder { "path": "." }`.
  - After editing, call `register_edit` or re-index with `index_file` so the symbols index remains current.
  - Prefer jCodeMunch code navigation (`search_symbols`, `get_file_tree`, `find_references`) over raw string searches.

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

- **Tailwind CSS**: Use Tailwind CSS utility classes matching the Stitch designs exactly. Tailwind is compiled at build-time to ensure a perfect 100/100 Lighthouse performance score.
- **Organic Corners**: Handled via custom utility classes:
  - `.organic-shape-1`: `border-radius: 60px 20px 50px 30px` (hero image)
  - `.organic-shape-2`: `border-radius: 30px 50px 20px 40px` (portal cards, stickers)
  - `.organic-shape-3`: `border-radius: 20px 60px 40px 20px` (compostable search widget)
  - `.organic-brutalism`: `border-radius: 4px 16px 8px 24px` (card blocks, wrappers)
  - `.organic-brutalism-alt`: `border-radius: 12px 4px 20px 8px` (details, comments)
- **Borders & Shadows**:
  - Custom borders: use standard Tailwind borders or `.border-4` / `.border-2` solid `#002201`.
  - Custom hard shadows: use `.shadow-hard` (`6px 6px 0px 0px #002201`) or `.shadow-hard-sm` (`4px 4px 0px 0px #002201`).
- **Palette Rules**: Use the mapped colors in `tailwind.config.mjs` (or defined in Tailwind CSS variables):
  - Canvas Background: `bg-background` (`#ecffe2`)
  - Foreground Ink: `text-on-background` (`#002201`)
  - Forest Green Accent: `text-primary` / `bg-primary` (`#0f5238`)
  - Terracotta Accent: `text-secondary` / `bg-secondary` (`#a0401f`)
  - Earth Brown: `text-tertiary` / `bg-tertiary` (`#52453a`)
  - Warning/Mustard Yellow: `bg-warning-badge` (`#F0C842` / `bg-mustard` `#e9d7c8`)
  - Safe/Green Badge: `bg-safe-badge` (`#59C985`)
  - Danger/Red Badge: `bg-danger-badge` (`#E05353`)
- **Typography**:
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
- **AI search engine compatibility**: Maintain `/feed.xml` RSS. Since `/llms.txt` and `/llms-full.txt` are static files in the `public/` directory, they do **not** update automatically; they must be manually updated whenever new content or blog posts are published.
- **Images**: Always specify dimensions (`width`/`height`) on `<img>` tags. The LCP hero image must not be lazy-loaded.

---

## 6. Security & Cloudflare Headers

- **Cloudflare Headers**: Maintaining `public/_headers` is required to ensure an A+ rating on securityheaders.com.
- **Security Protections**: Ensure HSTS, Frameguard, Content Security Policy (CSP), permissions-policy, and referrer-policy are configured strictly.
- **Redirects**: Maintain URL migrations inside `public/_redirects`.

---

## 7. Editorial Knowledge Base

All editorial and copywriting work must follow the documents in the `docs/` directory. They define the editorial standards for vermi.cl and are considered authoritative.

### Required reading

Whenever your task involves writing, editing, reviewing, translating, summarizing, researching, or expanding content intended for publication, consult the following documents before beginning work.

#### `docs/01-editorial-principles.md`

Defines:

- editorial philosophy
- scientific standards
- evidence policy
- article structure
- search intent philosophy
- AI retrieval optimization
- quality standards
- definition of done

This document governs **what** should be written.

#### `docs/02-voice-and-tone.md`

Defines:

- writing style
- voice
- tone
- Chilean Spanish usage
- preferred vocabulary
- formatting conventions
- headings
- terminology
- readability

This document governs **how** the content should sound.

#### `docs/03-chile-localization.md`

Defines:

- Chilean climate
- local gardening context
- common household waste
- seasons
- measurements
- local examples
- localization rules

This document governs **how recommendations are adapted to Chile**.

Never copy recommendations from international sources without localizing them.

#### `docs/04-content-workflow.md`

Defines the editorial production workflow, including:

- research
- outlining
- evidence synthesis
- drafting
- verification
- readability improvements
- SEO review
- LLM optimization
- editorial review

Whenever creating or substantially updating an article, follow this workflow from beginning to end.

Never skip verification or editorial review.

### Priority

If multiple documents appear to overlap, apply them in this order:

1. `01-editorial-principles.md`
2. `04-content-workflow.md`
3. `03-chile-localization.md`
4. `02-voice-and-tone.md`

Editorial principles always take precedence over writing style.

Scientific accuracy always takes precedence over fluency.

Local relevance always takes precedence over generic international recommendations.

### Research standards

When producing educational content:

- Prefer peer-reviewed scientific literature.
- Prefer university extension publications over commercial blogs.
- Distinguish established knowledge from expert opinion.
- Explicitly acknowledge uncertainty when evidence is limited.
- Never invent measurements, statistics, temperatures, nutrient values, or municipal information.
- Synthesize multiple high-quality sources rather than summarizing a single source.

### Content philosophy

Every published page should aim to become the definitive Spanish-language reference for its topic.

Content should be:

- scientifically rigorous
- practical
- evergreen
- immediately useful
- optimized for human readers first
- easy for search engines and language models to retrieve
- worthy of being cited

Never optimize for keywords at the expense of usefulness.

Solve the reader's problem completely.

### Canonical knowledge

Treat vermi.cl as a knowledge base rather than a collection of isolated articles.

Before creating new explanations for concepts such as _Eisenia fetida_, humus, lixiviado, pH, humidity, carbon, nitrogen, microorganisms, or compost biology, check whether a canonical explanation already exists and reuse its terminology.

Maintain consistency across the entire site.

### Applicability

These documents should be consulted whenever working on:

- blog articles
- guides
- tutorials
- FAQ pages
- food database entries
- glossary pages
- landing pages
- metadata
- structured data
- author pages
- newsletters
- downloadable resources
- any other user-facing educational content

Purely technical code changes that do not affect published content do not require consulting these editorial documents.

### Repository-wide editorial rules

The editorial documents are **normative**.

Do not override them unless the user explicitly instructs you to.

If two editorial documents conflict, follow this priority:

1. `docs/01-editorial-principles.md`
2. `docs/04-content-workflow.md`
3. `docs/03-chile-localization.md`
4. `docs/02-voice-and-tone.md`

When modifying code only, follow this `AGENTS.md`.

When modifying published content, follow both this `AGENTS.md` and the editorial documents.

When modifying both code and content, follow both instruction sets simultaneously.

All user-facing content must use natural Chilean Spanish unless explicitly requested otherwise.

All heading elements must use Spanish sentence case and must never end with a period.

All text files in the repository must remain UTF-8 encoded. Never introduce mojibake or corrupted accent sequences.

---

## 8. Verification Checks

Before making a commit, run:

```bash
npm run format
npm run check
npm run build
npm run test
```

Document any skipped checks and explain the reasoning.

## 8.1 SEO and agent-discovery surfaces

Keep these routes and artifacts aligned whenever SEO infrastructure changes:

- `src/utils/schema.ts`: typed Schema.org graph builder shared by layouts and endpoints.
- `src/env.d.ts`: global JSX attributes type extension for WebMCP (`toolname`, `tooldescription`, `toolparamdescription`).
- `src/pages/schema/post.json.ts`: consolidated JSON-LD corpus for blog content.
- `src/pages/schemamap.xml.ts`: semantic discovery map.
- `src/pages/.well-known/api-catalog.ts`: RFC 9727 linkset catalog for schema endpoints.
- `src/pages/blog/[...slug].md.ts`: Markdown alternates for collection entries.
- `src/pages/sitemap.xml.ts`: sitemap with `gitLastmod()`-backed dates where possible.
- `src/pages/591c2b87f0b68c44f260215f5d8e9da3.txt.ts`: IndexNow key route.
- `public/robots.txt`: keep it standards-compliant for validators like PSI. Advertise `Sitemap` only; expose semantic discovery through `/.well-known/api-catalog` and `/schemamap.xml` as normal routes instead of a custom robots directive.
- `public/_headers`: must retain `No-Vary-Search` for campaign params.
- `.lycheeignore` and `.github/workflows/lychee.yml`: link-checking exclusions and workflow scope.
- **WebMCP Integration**: Tag `<form>` with `toolname` and `tooldescription`. Tag input fields with `toolparamdescription`. Ensure all form inputs have associated `<label for="...">` matching input `id` to maintain accessibility tree integrity.

Base metadata is generated in `src/layouts/BaseLayout.astro`. Do not rely on individual pages to emit the only JSON-LD payload for a route; the layout must always produce a base graph and merge page-specific nodes when present.

---

## 9. Food Search Database ("¿Las lombrices pueden comer esto?")

The interactive food search on the homepage uses a client-side search index generated from local JSON files:

- **Data Location**: JSON entries reside in `src/content/alimentos/` (e.g., `platano.json`, `cafe.json`).
- **Schema & Validation**: Defined in `src/content.config.ts`. The schema fields are:
  - `name` (string): Common Chilean name (sentence case).
  - `category` (string): Group label (e.g. "Húmedo / Frutas", "Seco / Carbono").
  - `status` (enum: `'safe'`, `'warning'`, `'danger'`): Composting safety level.
  - `instructions` (string): Handling advice.
  - `nutrition` (string, optional): Plant-relevant nutrients details.
- **Endpoint**: `src/pages/api/alimentos.json.ts` maps and compiles these files into a single indexable static JSON array at build time.
- **Search Component**: `src/components/IsItCompostable.astro` fetches the API endpoint, performs accent-insensitive search logic, and renders the result card.

### Rules for Adding New Food Entries

1.  **Scientific Grounding**: All claims, safety classifications, and instructions must be backed by scientific research. Explain the biological _why_ (e.g., cell wall breakdown in freezing, azufrado oil irritation, anaerobic putrefaction).
2.  **Nutritional Profiles**: Every edible entry must include the `nutrition` field mapping NPK values or key soil nutrients (Nitrogen, Potassium, Phosphorus, Calcium, Carbon, Sulfur) and explain which part of plant development they enhance (foliar growth, flowering, roots, etc.).
3.  **Local Context Integration**: The copy must use natural Chilean Spanish ("tuteo") and naturally weave in the Chilean domestic context (e.g., waste from asados, pebre, orange peel tea, palta abundancy) inside the `instructions` paragraph.
4.  **Scientific Name Formatting**: Wrap scientific names in single asterisks (e.g. `*Eisenia fetida*`). The frontend component escapes HTML and parses these specifically into `<i>` tags. Do not write raw HTML.
5.  **Capitalization & Punctuation**: Food names should follow Spanish sentence case (only capitalize the first letter and proper nouns, e.g. "Borra de café"). Instructions and nutrition copy must be complete sentences ending in periods, but titles/names must not.
