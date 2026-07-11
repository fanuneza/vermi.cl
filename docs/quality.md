# Contrato de calidad

## Rutas representativas

Las verificaciones manuales y automatizadas se concentran en estas rutas porque cubren la navegación, el contenido editorial, la interacción principal y los estados de error:

- `/`: portada, imagen LCP y buscador de alimentos.
- `/blog/`: listado editorial y navegación temática.
- `/blog/vermi-en-departamento/`: artículo, imágenes, Schema.org y alternate Markdown.
- `/contacto/`: etiquetas, validación y envío asíncrono.
- `/404/`: estado de error y recuperación de navegación.

## Invariantes automatizados

Después de un build, `npm run test` debe comprobar:

- JSON-LD, canonical, metadatos sociales y `noindex` donde corresponda.
- RSS, robots, sitemap semántico, catálogo API, corpus Schema.org y alternates Markdown.
- La CSP y `No-Vary-Search` publicados en `_headers`.
- Ausencia de URLs locales de desarrollo en toda la salida HTML.

## Verificación antes de entregar

Ejecutar, en este orden:

```bash
npm run format
npm run check
npm run build
npm run test
```

`npm run build` valida el formato sin modificar archivos. Si se requiere sólo validar formato, usar `npm run format:check`.

Para cambios de interfaz, revisar además teclado, foco visible, zoom/reflow, contraste, contenido con movimiento reducido y mensajes de error en las rutas afectadas. Para una entrega de producción, medir las rutas representativas sobre el build de producción y revisar cualquier resultado de Lighthouse inferior a 100 antes de publicar.

## Límites de las pruebas

Las pruebas de build no sustituyen la validación posterior al despliegue: se deben revisar headers reales, CSP, redirecciones, 404 y caché en Cloudflare Pages. Los resultados variables de Lighthouse requieren mediciones repetidas y una explicación documentada si no alcanzan el objetivo.
