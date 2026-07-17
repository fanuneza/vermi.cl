---
target: homepage
total_score: 26
p0_count: 0
p1_count: 4
timestamp: 2026-07-16T23-37-16Z
slug: src-pages-index-astro
---

Method: dual-agent (A: assessment_a · B: assessment_b)

## Design Health Score

| #         | Heuristic                       |     Score | Key issue                                                                                                          |
| --------- | ------------------------------- | --------: | ------------------------------------------------------------------------------------------------------------------ |
| 1         | Visibility of system status     |       2/4 | Search works well normally, but a failed index request can leave “Buscando…” without a visible failure or retry.   |
| 2         | Match system / real world       |       2/4 | Beginner framing is undermined by “núcleo de cría”, “inercia térmica” and “congelación celular”.                   |
| 3         | User control and freedom        |       3/4 | Drawer, modal and search are controllable; failed search loading has no recovery path.                             |
| 4         | Consistency and standards       |       3/4 | The system is coherent, but its effects are over-applied and the hero blur contradicts the no-blur paper metaphor. |
| 5         | Error prevention                |       3/4 | Suggestions and minimum-length guidance help; network and broad-query ambiguity are weakly handled.                |
| 6         | Recognition rather than recall  |       4/4 | Text labels, examples, categories and suggestions make actions discoverable.                                       |
| 7         | Flexibility and efficiency      |       2/4 | Query persistence helps, but returning visitors still depend on scrolling and the search returns only one match.   |
| 8         | Aesthetic and minimalist design |       2/4 | Distinctive but noisy: borders, shadows, rotation, stickers and uppercase type compete almost everywhere.          |
| 9         | Error recovery                  |       2/4 | No-match copy is useful; network failure has no diagnosis or retry.                                                |
| 10        | Help and documentation          |       3/4 | Guides are visible, but the first-time “how do I actually begin?” route is fragmented.                             |
| **Total** |                                 | **26/40** | **Acceptable; significant hierarchy and first-timer work needed**                                                  |

## Anti-patterns verdict

**Does this look AI-generated? Not immediately, but it is not cleanly acquitted.** The spring-green canvas, actual worm imagery, dark ink, Chilean context and irregular shapes establish a recognizable identity. This is not generic sage-and-cream eco-SaaS.

The problem is composition. The page follows a highly predictable generated-landing-page skeleton: split hero, decorative kicker, two CTAs, oversized interactive panel, three-card category grid, then another three-card content grid. The “handmade” vocabulary is applied like a theme filter: nearly every surface gets some combination of border, offset shadow, organic radius, rotation, sticker, underline, icon box or emoji. When every object performs the brand, none feels deliberately art-directed.

Specific tells:

- “APRENDE HOY” is a tiny uppercase decorative eyebrow with no information value.
- The repeated icon + title + copy + badge card formula is generic beneath the styling.
- Nearly every heading shouts in uppercase, flattening hierarchy.
- Repeated underline slabs and systematic wobble feel machine-applied rather than handmade.
- The hero’s blurred blobs contradict the committed physical-paper/no-blur system.

**Deterministic scan:** `detect.mjs` returned `[]` with exit code 0 for `src/pages/index.astro`: zero findings, zero rule locations, and no CLI false positives. That is useful evidence, not an acquittal. The homepage avoids codified slop patterns while still suffering from higher-order sameness and hierarchy problems that the detector cannot judge.

**Browser evidence:** fresh desktop renders at 1440×1000 and mobile renders at 390×844 showed no clipping, heading overflow, or horizontal document overflow. The responsive grids collapse correctly. On mobile, however, the primary action sits at the lower edge of the first viewport; the secondary action and signature search are below the fold. Mutable-injection preflight succeeded, but the detector overlay was not injected before finalization, so no reliable user-visible overlay or browser-console detector result exists.

## Overall impression

The site has more personality than most educational sustainability projects and a genuinely useful signature tool. But the homepage is visually louder than it is decisive. Its biggest opportunity is not “more polish”; it is choosing one authoritative beginner journey and rationing the visual system so that journey becomes obvious.

## What’s working

1. **Memorable identity:** the saturated green canvas, terracotta accents, real worm photograph, irregular corners and dark ink are distinctive and emotionally appropriate.
2. **Useful signature interaction:** the food checker lets visitors act immediately, with suggestions, live verdicts, progressive disclosure and actionable no-result copy.
3. **Strong accessibility intent:** semantic sections, responsive images with dimensions, clear text navigation, large touch targets, live regions, focus management and reduced-motion handling are materially above average.

## Priority issues

### [P1] The homepage has no authoritative primary path

**Why it matters:** the product strategy says guides are the front door, yet the food checker is the most commanding object after the hero. The hero gives “Explora nuestro blog” and “¿Qué pueden comer?” near-peer weight, the header adds “Unirse”, and later sections repeat categories and guides. A first-timer must reverse-engineer the information architecture before learning.

**Fix:** choose one primary beginner journey. If guides are the goal, promote a single “Empieza aquí” guide as the hero action, surface the next two steps immediately after it, and frame search as a utility for people who already have a compostera. If search is the acquisition hook, admit that and make every verdict lead into one contextual guide.

**Suggested command:** `/impeccable shape src/pages/index.astro`

### [P1] The copy betrays the beginner promise

**Why it matters:** “núcleo de cría”, “inercia térmica de tu balcón”, “balance óptimo de nitrógeno y carbono” and “congelación celular” are not how an uncertain Chilean beginner describes their problem. The copy manufactures authority through jargon and increases intimidation.

**Fix:** lead with household decisions and symptoms: dónde poner la caja, cuánto material seco agregar, qué residuos evitar y qué hacer si huele mal. Introduce technical vocabulary only after the plain-language answer and define it immediately. Replace “alta calidad agrícola” with a concrete, supportable benefit.

**Suggested command:** `/impeccable clarify src/pages/index.astro`

### [P1] Mobile delays comprehension and action

**Why it matters:** at 390×844, the photograph consumes most of the opening screen. The headline follows, the main CTA only reaches the bottom edge, and both the secondary CTA and actual checker require more scrolling. The page becomes attractive before it becomes useful.

**Fix:** shorten the opening promise and reduce the mobile image height, or compose image and promise into one tighter opening. One primary action must fit comfortably in the initial viewport. Do not solve this only by shrinking type.

**Suggested command:** `/impeccable adapt src/pages/index.astro`

### [P1] The signature search can fail silently

**Why it matters:** if `/api/alimentos.json` fails, the visible UI can remain at “Buscando en el diario…” while the real error lives only in the console. The homepage’s most useful feature then appears frozen.

**Fix:** add a distinct live-region error state that preserves the query, explains what failed, and offers “Reintentar”. Keep this separate from “sin resultados”. For broad category matches, show multiple candidates instead of silently choosing the first record.

**Suggested command:** `/impeccable harden src/components/IsItCompostable.astro`

### [P2] The design system over-performs everywhere

**Why it matters:** thick outlines, hard shadows, rotations, organic radii, uppercase headings, stickers, emojis and underline slabs appear at nearly every level. This flattens hierarchy and makes the visual language feel templated despite its originality.

**Fix:** reserve the complete sticker treatment for the hero’s useful label, search verdicts and one editorially dominant guide. Let secondary content become quieter. Replace one repeated three-card grid with an asymmetrical lead story plus compact links. Remove the hero blur blobs.

**Suggested command:** `/impeccable quieter src/pages/index.astro`

## Persona red flags

**Jordan — uncertain first-timer**

- “Explora nuestro blog” and “¿Qué pueden comer?” compete before Jordan knows which route fits.
- “Unirse” unexpectedly opens a newsletter rather than a starting flow.
- The page never simply answers: “¿Puedo hacer esto en un departamento y qué necesito?”
- The “Manual de inicio” description sounds advanced rather than reassuring.

**Casey — distracted mobile visitor**

- The first viewport prioritizes the image over an actionable promise.
- Dense uppercase headings and large decorated cards extend the scroll.
- Search suggestion shortcuts are several screens below arrival.
- “Ver todas las guías” becomes visually stranded beneath its heading on mobile.

**Riley — stress tester**

- Failed food-index loading has no visible recovery.
- Broad category or keyword searches return the first match, which can appear arbitrarily definitive.
- The URL remembers a query but not whether loading succeeded.
- “Unirse” can promote a disabled newsletter; the unavailable state is disclosed only after opening the modal.

## Minor observations

- Remove “APRENDE HOY” unless it carries useful context.
- Correct “BASICO” to “BÁSICO”.
- Rename “Unirse” to “Recibe consejos” or “Newsletter”.
- One photo sticker is enough; the worm and carrot ornaments add no information.
- Line-clamping dense category copy hides the writing problem rather than solving it.
- Latest-guide cards contain too much metadata for their size.
- The visible Chilean differentiation is weaker than the positioning claim; “hogar chileno” is assertion, not evidence.
- The page ends with another card grid instead of closure or a concrete “ya puedes empezar” next step.

## Questions to consider

- If guides are truly the front door, why is search the homepage’s visual centerpiece?
- What single sentence would make a nervous apartment dweller feel safe enough to begin?
- Would removing half the rotations, shadows and stickers make this feel less branded—or more deliberately handmade?
- What should a visitor have accomplished by the time they reach the footer?
- If only one CTA survived above the fold, which one would prove the product’s purpose fastest?
