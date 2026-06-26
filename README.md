# vermi.cl 🪱

¡Wena! Bienvenidos a **vermi.cl**, un centro educativo y tecnológico chileno enfocado en la **lombricultura urbana (worm composting)** adaptada al clima de la biorregión central de Chile. 

El portal es 100% de código abierto, sin fines comerciales ni e-commerce, diseñado para divulgar la ciencia de la lombricultura y empoderar a hogares (de departamento y de casa) para que reciclen sus residuos orgánicos de forma exitosa mediante *Eisenia fetida* (lombriz californiana).

---

## 🌟 Características Clave
- **¿Es compostable? (Buscador Inteligente)**: Widget interactivo en la página principal para buscar de forma instantánea si un residuo (platano, cítricos, cartón, café, etc.) se puede echar a la vermicompostera y cómo prepararlo.
- **Enfoque Científico sin Asco**: Artículos prácticos explicados desde la biología molecular y química (acidificación, condiciones anaeróbicas, letargo térmico) para resolver dudas de manera objetiva.
- **Adaptación Biorregional Chilena**: Guías específicas para el clima mediterráneo semiárido del Valle Central (gestión de calor extremo en verano, heladas en invierno, y reemplazo de insumos comerciales por cartón reciclado y hojas de árboles urbanos como el plátano oriental).
- **Rendimiento Extremo**: Optimizado para un **score de 100/100 en Lighthouse** (Rendimiento, Accesibilidad, Buenas Prácticas y SEO).

---

## 🎨 Estética Visual: Eco-Zine / Organic-Brutalism
El sitio sigue un manifiesto visual de **Zine Ecológico / Scrapbook Hecho a Mano**:
- **Bordes y Sombras Brutalistas**: Bordes negros sólidos y sombras duras (`shadow-hard`).
- **Formas Orgánicas**: Esquinas asimétricas mediante radios de curvatura personalizados (`.organic-shape-1`, `.organic-shape-2`).
- **Paleta de Colores Terrosos**:
  - **Fondo:** Verde muy pálido / papel reciclado (`#ecffe2`)
  - **Texto Principal:** Verde bosque ultra oscuro (`#002201`)
  - **Detalles/Acentos:** Verde pino (`#0f5238`), Terracota arcillosa (`#a0401f`) y Amarillo mostaza (`#F0C842`).

---

## 🛠️ Tecnologías Utilizadas
- **Framework**: [Astro v7](https://astro.build/) (Generación de Sitios Estáticos - SSG).
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (compilado en tiempo de compilación para máxima velocidad).
- **Infraestructura**: Desplegado en **Cloudflare Pages** a través de integración continua con GitHub.
- **SEO & AI-Ready**: Cuenta con un feed RSS generado dinámicamente (`/feed.xml`), además de archivos compatibles con buscadores de IA (`/llms.txt` y `/llms-full.txt`).

---

## 🚀 Comandos de Desarrollo

Asegúrate de tener instalado [Node.js](https://nodejs.org/).

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Levantar el servidor de desarrollo
Inicia un servidor local con recarga rápida (HMR):
```bash
npm run dev
```
Abre tu navegador en `http://localhost:4321`.

### 3. Ejecutar diagnóstico de tipos
Verifica que las referencias TypeScript e integridad de Astro estén correctas:
```bash
npx astro check
```

### 4. Compilar para producción
Genera el sitio web estático optimizado en la carpeta `/dist`:
```bash
npm run build
```

---

## ☁️ Configuración de Despliegue en Cloudflare Pages
El despliegue está automatizado con la integración de GitHub de Cloudflare Pages:
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`

> [!NOTE]
> El proyecto está configurado como **completamente estático** (`output: 'static'`). No requiere de adaptadores de servidor (SSR), lo que permite que se compile directamente a la carpeta `/dist`, optimizando el rendimiento global en la red de borde de Cloudflare.