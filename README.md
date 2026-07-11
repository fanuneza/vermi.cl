# vermi.cl

`vermi.cl` es un sitio estático en Astro 7 sobre lombricultura doméstica en Chile. El foco del repositorio es combinar contenido educativo en español chileno, rendimiento extremo y una capa SEO/AI-ready verificable en build.

## Qué incluye

- Guías editoriales en `src/content/blog/`
- Buscador client-side `¿Las lombrices pueden comer esto?` con índice generado desde `src/content/alimentos/`
- RSS, sitemap, schemamap, catálogo API y alternates Markdown para crawlers y agentes
- Headers de Cloudflare Pages endurecidos en `public/_headers`

## Desarrollo local

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:4321`.

## Comandos principales

```bash
npm run format
npm run check
npm run build
npm run test
```

`npm run build` genera la salida estática en `dist/`. `npm run test` valida los artefactos SEO clave ya construidos, incluyendo JSON-LD, canonical/noindex y endpoints de descubrimiento.

## Estructura útil

- `src/pages/`: rutas Astro y endpoints estáticos
- `src/layouts/`: layout base y layout de artículos
- `src/utils/schema.ts`: builder tipado de Schema.org
- `public/`: assets raíz, `robots.txt`, `llms.txt`, `llms-full.txt`, `_headers`
- `.github/workflows/lychee.yml`: auditoría continua de enlaces
- `docs/architecture.md`: decisiones de plataforma, límites estáticos y servicios externos
- `docs/quality.md`: rutas representativas y contrato de verificación

## Despliegue

Cloudflare Pages debe usar:

- Build command: `npm run build`
- Output directory: `dist`

El proyecto es estrictamente `output: "static"` y no debe usar adapters de Astro.
