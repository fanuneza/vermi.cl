---
name: vermi.cl
description: An organic-brutalism eco-zine for learning home worm composting in Chile.
colors:
  background: "#ecffe2"
  ink: "#002201"
  primary: "#0f5238"
  primary-container: "#2d6a4f"
  on-primary-container: "#a8e7c5"
  primary-fixed: "#b1f0ce"
  secondary: "#a0401f"
  secondary-container: "#fe8760"
  on-secondary-container: "#732001"
  secondary-fixed: "#ffdbd0"
  tertiary: "#52453a"
  tertiary-container: "#6a5d51"
  tertiary-fixed: "#f2dfd0"
  surface: "#ecffe2"
  surface-dim: "#b4e8a6"
  surface-variant: "#bcf0ae"
  surface-container-low: "#d6ffc9"
  surface-container: "#c7fcb8"
  surface-container-high: "#c1f6b3"
  surface-container-highest: "#bcf0ae"
  surface-container-lowest: "#ffffff"
  on-surface-variant: "#404943"
  warning-badge: "#f0c842"
  safe-badge: "#59c985"
  danger-badge: "#e05353"
  error: "#ba1a1a"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  mustard: "#e9d7c8"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 4vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(1.55rem, 1.2rem + 1.05vw, 2.1rem)"
    fontWeight: 900
    lineHeight: 1.12
    letterSpacing: "0"
  body:
    fontFamily: "Fira Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  serif-body:
    fontFamily: "Merriweather, serif"
    fontSize: "clamp(1.02rem, 0.98rem + 0.18vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.78
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  organic-1: "60px 20px 50px 30px"
  organic-2: "30px 50px 20px 40px"
  organic-3: "20px 60px 40px 20px"
  brutalism: "4px 16px 8px 24px"
  brutalism-alt: "12px 4px 20px 8px"
  none: "0"
spacing:
  margin-mobile: "20px"
  margin-desktop: "64px"
  stack-gap-mobile: "32px"
  stack-gap-desktop: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.headline}"
    rounded: "8px"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    typography: "{typography.headline}"
    rounded: "8px"
    padding: "0.75rem 1.5rem"
  badge-sticker:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "0"
    padding: "0.25rem 0.75rem"
  category-card:
    backgroundColor: "{colors.tertiary-fixed}"
    textColor: "{colors.ink}"
    rounded: "{rounded.organic-2}"
    padding: "1.5rem"
  blog-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.brutalism}"
    padding: "1.5rem"
---

# Design System: vermi.cl

## 1. Overview

**Creative North Star: "Organic-Brutalism Eco-Zine"**

vermi.cl looks like a handcrafted scrapbook a knowledgeable friend put together on their kitchen table: chunky ink-black borders, hard sticker-paper shadows, and asymmetric organic corners, all slightly off-kilter, like a page taped in at a jaunty angle. It pairs a loud, no-blur brutalist construction (thick borders, offset hard shadows, uppercase black display type) with a soft, spring-green nature palette and rounded, uneven corners — brutalism's confidence without brutalism's coldness. Every surface reads as cut from paper and stuck down by hand, never as a glowing, floating SaaS panel.

This system explicitly rejects the sterile corporate eco-brand look (muted sage-and-cream palettes, stock nature photography, soft ambient shadows), the academic/scientific-journal look (dense, dry, personality-free layouts), and the generic AI-template landing page (gradient text, tiny tracked eyebrows on every section, hero-metric blocks). Where those systems soften and recede, vermi.cl commits: hard black outlines, saturated spring green, and playful rotation on nearly every card and badge.

**Key Characteristics:**

- Thick, uniform black ink borders (`#002201`) around nearly every contained element
- Hard offset shadows with zero blur, evoking a paper cutout stuck slightly proud of the page
- Asymmetric, organic border-radius values instead of uniform rounded corners
- Small rotation (`rotate-1` to `rotate-[-3deg]`) applied to cards, badges, and stickers for a hand-placed feel
- Uppercase, black-weight display type for headlines; monospace for labels, badges, and metadata

## 2. Colors: The Backyard Compost Palette

The palette is a spring-green canvas (not a neutral gray or cream) carrying a forest-green primary, a terracotta secondary, and an earth-brown tertiary — literally the colors of healthy compost and new growth.

### Primary

- **Forest Green** (`#0f5238`): The primary action color — main CTA buttons, active nav state, primary icon accents.
- **Moss Green** (`#2d6a4f` container / `#a8e7c5` on-container / `#b1f0ce` fixed): Container backgrounds for primary-tinted UI (the desktop "Unirse" pill, primary badges).

### Secondary

- **Terracotta** (`#a0401f`): Logo wordmark, secondary CTA, link color inside article prose, active-state underlines.
- **Coral Clay** (`#fe8760` container / `#732001` on-container / `#ffdbd0` fixed): Secondary badge and container backgrounds — the "¿Qué pueden comer?" pill, newsletter accent tab.

### Tertiary

- **Earth Brown** (`#52453a` / `#6a5d51` container / `#f2dfd0` fixed): Warm neutral containers — the "Manual de inicio" category card background, footer background.

### Neutral

- **Spring Green Mist** (`#ecffe2`): The body/surface background — a saturated, committed green, never a cream or gray neutral.
- **Deep Forest Ink** (`#002201`): Universal text, border, and shadow color. Every hard border and hard shadow in the system uses this exact value.
- **Slate Moss** (`#404943`): Secondary body text (`on-surface-variant`) where full ink weight would be too heavy.
- **Paper White** (`#ffffff`): Sticker badges, search input fields, lowest-elevation containers.
- **Surface ramp** (`#d6ffc9` low → `#c7fcb8` → `#c1f6b3` → `#bcf0ae` highest, `#b4e8a6` dim): Tonal steps for stacked card backgrounds and hover states within the green surface family.

### Semantic

- **Safe Badge** (`#59c985`): "SEGURO" compostable-food verdict.
- **Warning Badge** (`#f0c842`): Caution / moderation verdicts, mustard suggestion chips.
- **Danger Badge** (`#e05353`): "NO COMPOSTABLE" verdict, destructive states.
- **Error** (`#ba1a1a` / `#ffdad6` container / `#93000a` on-container): Form and system errors.

### Named Rules

**The One-Ink Rule.** Every border, hard shadow, and outline in the system is `#002201` (Deep Forest Ink) — never a lighter gray or the brand green. This single consistent ink color is what makes disparate colored surfaces read as one cohesive scrapbook.

**The Signature-Intensity Rule.** Hard shadows, sticker badges, rotations, tape, and heavy outlines are reserved for signature moments: the wordmark, hero imagery, food-search verdicts, and deliberate feedback. Ordinary navigation, guide cards, utility pages, article prose, and supporting sidebars use two-pixel ink borders without shadows or rotation. The quiet surfaces create the contrast that lets the scrapbook moments remain memorable.

## 3. Typography

**Display/Headline Font:** Bricolage Grotesque Variable (weight 200–800, used at 900/black), with sans-serif fallback
**Body Font:** Fira Sans (400/700), with sans-serif fallback
**Article Body Font:** Merriweather (serif), used only inside long-form blog prose
**Label/Mono Font:** Space Mono, for badges, metadata, and stickers

**Character:** A geometric, black-weight grotesque for shouting headlines paired with a plain, humanist sans for reading text and a typewriter mono for labels — the contrast mirrors a zine's mix of hand-lettered cover type and typed captions.

### Hierarchy

- **Display** (900, `clamp(2rem, 1.2rem + 4vw, 3.75rem)`, leading-none): Hero headline only, always uppercase.
- **Headline** (900, `clamp(1.55rem, 1.2rem + 1.05vw, 2.1rem)`, 1.12 line-height): Section headings, card titles, modal titles — uppercase.
- **Body** (400, 1rem, 1.5 line-height): UI copy, descriptions, buttons.
- **Article Body** (400, `clamp(1.02rem, 0.98rem + 0.18vw, 1.12rem)`, 1.78 line-height, Merriweather): Long-form blog prose only — capped implicitly by the 8-column article grid.
- **Label** (700, 0.75rem, 0.05em tracking, uppercase, Space Mono): Badges, stickers, dates, difficulty tags, form labels.

### Named Rules

**The Shout-Then-Explain Rule.** Headlines are always uppercase and black-weight; body text is always sentence case and regular weight. Never mix the two — a headline in sentence case or body text in caps breaks the zine's cover-vs-caption logic.

## 4. Elevation

vermi.cl uses **sticker-and-paper elevation**: flat, zero-blur, fully-opaque offset shadows in Deep Forest Ink, as if every element were a paper cutout sitting slightly proud of the page. There is no soft ambient glow anywhere in the system — depth comes entirely from the hard offset and from interactive elements collapsing their offset toward `0,0` on press, mimicking the sticker being pressed flat.

### Shadow Vocabulary

- **Hard** (`box-shadow: 6px 6px 0px 0px #002201`): Default resting elevation for cards, modals, the header/footer bar.
- **Hard-sm** (`box-shadow: 4px 4px 0px 0px #002201`): Smaller elements — buttons, badges, icon boxes, drawer items.
- **Hard-hover** (`box-shadow: 8px 8px 0px 0px #002201` + `translate-y(-2px)`): Cards lift and deepen their shadow on hover, as if peeling further off the page.
- **Hard-press** (`box-shadow: 0px 0px 0px 0px #002201` + `translate(4px, 4px)`): Buttons flatten completely on active/press, landing exactly under their resting shadow offset.

### Named Rules

**The Flatten-On-Press Rule.** Every interactive hard-shadow element must animate its shadow toward `0 0 0 0` and translate by the exact shadow offset on `:active`. A button that only changes color on press, without flattening its shadow, breaks the paper-cutout illusion.

## 5. Components

Components are tactile and a little wobbly: slight rotation, organic asymmetric corners, and hard shadows that respond physically to hover and press, so nothing ever feels machine-perfect or grid-locked.

### Buttons

- **Shape:** Rectangular with a small border-radius (`8px`) for standard buttons; fully organic radii (`{rounded.organic-2}`) for the nav "Unirse" pill.
- **Primary (`.btn--brutal` + `bg-primary`):** Forest Green background, white or ink text, 2px ink border, Hard-sm shadow, uppercase headline font, small `rotate-1` on some instances (e.g. the nav join button).
- **Hover / Focus:** Border and text stay fixed; shadow and position shift per the Flatten-On-Press rule. Focus rings use `focus-within:ring-4` in the Primary Container color on inputs.
- **Secondary/Suggestion chips:** Smaller mono-font pills (`bg-primary-container`, `bg-warning-badge`, etc.) each carrying a distinct small rotation, used for the compostable-food quick-search suggestions.

### Badges / Stickers

- **Style (`.badge--sticker`):** White background, 3px ink border, Hard-sm shadow, uppercase mono label, zero border-radius — reads as a die-cut sticker, not a soft pill.
- **State:** Semantic variants (Safe/Warning/Danger) swap only the background color; border, shadow, and type treatment stay constant.

### Cards / Containers

- **Corner Style:** Organic asymmetric radii (`{rounded.organic-1}`, `{rounded.organic-2}`, `{rounded.brutalism}`) — never a uniform `border-radius`. Each card family gets one consistent radius so repetition still reads as a system.
- **Background:** Tonal surface or container colors (tertiary-fixed, surface-container, secondary-fixed) per card family, never plain white except for the lowest-elevation search input and sticker badges.
- **Shadow Strategy:** Hard at rest, Hard-hover on interaction (see Elevation).
- **Border:** 4px solid ink border on primary cards; 2px on nested/smaller elements.
- **Internal Padding:** 1.5rem (24px) standard card padding; 2rem on md+ breakpoints for hero-level containers.
- **Quiet Card (`.quiet-card`):** Two-pixel ink border, `organic-brutalism-alt` corners, no rotation, and no resting shadow. This is the default for guide cards, secondary information, forms, and utility content.

### Inputs / Fields

- **Style:** 4px ink border, fully rounded (`rounded-full`) for the main food-search bar; smaller 2px-border, minimal-radius fields for the newsletter modal.
- **Focus:** `ring-4` in Primary Container color plus a border color shift to Primary — no glow/blur, a hard-edged focus ring instead.
- **Error / Disabled:** Error state uses a dedicated `#FFF1E8` container card with Hard-sm shadow rather than a red input outline; disabled buttons drop to 60% opacity with `cursor-not-allowed`.

### Navigation

- **Style:** Sticky top bar, Surface background, 4px bottom ink border, Hard shadow — the header itself is a "sticker" stuck to the top of the page.
- **Typography:** Body font for nav links, Headline font (black, rotated, bordered) for the wordmark.
- **States:** Active link gets a 4px Primary underline and Primary text color; inactive links are `on-surface-variant` until hover, when they shift to Primary and nudge diagonally by 2px.
- **Mobile:** Off-canvas drawer sliding from the left, active item rendered as an offset ink block behind a green sticker tile (a literal drop-shadow made of two stacked `<div>`s).

### Signature Component: The Sticker Badge

The `.badge--sticker` treatment (white fill, 3px ink border, Hard-sm shadow, uppercase mono label, zero radius) is the system's most distinctive recurring motif — it appears on category cards, blog metadata, and the hero's "Aprende hoy" tag. Any new small callout label should default to this pattern before inventing a new one.

## 6. Do's and Don'ts

### Do:

- **Do** use Deep Forest Ink (`#002201`) for every hard border and hard shadow — never substitute a lighter gray or a brand color.
- **Do** apply small, varied rotation (`rotate-1` to `rotate-[-3deg]`) to cards, badges, and stickers so the layout reads as hand-placed, not grid-perfect.
- **Do** use asymmetric organic border-radius values (`{rounded.organic-1/2/3}`, `{rounded.brutalism}`) instead of a single uniform corner radius.
- **Do** flatten an element's shadow to `0 0 0 0` and translate it by the shadow's offset on `:active`, so presses feel physically real.
- **Do** keep headlines uppercase/black-weight and body copy sentence-case/regular — the contrast is the hierarchy.
- **Do** use the spring-green (`#ecffe2`) surface as a committed, saturated background choice, not a muted neutral.

### Don't:

- **Don't** build a corporate or clinical eco-brand look: no muted sage-and-cream palette, no stock nature photography, no soft ambient drop-shadows standing in for the hard-shadow system.
- **Don't** produce an academic/scientific-journal layout: no dense, dry, personality-free type blocks with no rotation, stickers, or organic shape.
- **Don't** reach for generic AI-template landing-page patterns: no gradient text, no tiny tracked uppercase eyebrows above every section, no hero-metric/stat-tile blocks.
- **Don't** use a soft blurred box-shadow anywhere; every shadow in this system is a hard, zero-blur offset.
- **Don't** use a uniform border-radius (e.g. `rounded-lg` on all four corners) on a primary card, button, or badge — always reach for one of the organic/brutalism radius values first.
- **Don't** leave a hard-shadow element static on hover/press; a card or button that never lifts or flattens looks broken, not restrained.
