# Arquitectura de vermi.cl

## Propósito técnico

vermi.cl es una base educativa estática sobre lombricultura doméstica en Chile. La arquitectura prioriza HTML prerenderizado, carga mínima y superficies de descubrimiento verificables para lectores, buscadores y agentes.

## Plataforma y despliegue

- Astro 7 genera salida estática (`output: "static"`) en `dist/`.
- Cloudflare Pages despliega desde la integración con GitHub usando `npm run build`.
- No se usa un adapter de Astro: la salida debe permanecer en la raíz de `dist/` para Cloudflare Pages.
- `public/_headers` y `public/_redirects` son las fuentes de configuración de headers y migraciones en producción.

## Contenido y descubrimiento

- Las colecciones de blog y alimentos son fuentes locales tipadas; no hay CMS ni fetch de contenido en tiempo de ejecución.
- `BaseLayout.astro` produce los metadatos base y el grafo Schema.org compartido. Las rutas agregan nodos específicos sin reemplazar ese grafo.
- RSS, sitemap, schemamap, catálogo API, corpus Schema.org y alternates Markdown son rutas estáticas generadas durante el build.
- `llms.txt` y `llms-full.txt` son archivos públicos mantenidos manualmente. Cada publicación o cambio de URL debe revisarlos junto con los artefactos de descubrimiento.

## JavaScript y servicios externos

- El buscador de alimentos es la única interacción principal del sitio: carga su índice estático bajo demanda desde `/api/alimentos.json`.
- El formulario de contacto usa la función de Cloudflare Pages `/api/contacto`, que entrega correo mediante Resend con `RESEND_API_KEY` configurada sólo en el entorno de despliegue.
- El newsletter publica a MailerLite. Cualquier nuevo proveedor externo requiere actualizar CSP, política de privacidad, esta nota y las pruebas aplicables antes de incorporarse.
- No se cargan scripts de desarrollo, analítica ni widgets de terceros en la salida de producción sin una necesidad documentada.

## Decisiones de rendimiento

- Las imágenes usan assets locales y dimensiones explícitas; la imagen LCP no se carga de forma diferida.
- Las fuentes locales críticas se precargan desde el layout base. Cualquier preload adicional debe medirse antes de agregarse.
- El CSS se compila durante el build y los assets de Astro se cachean como inmutables mediante `_headers`.
