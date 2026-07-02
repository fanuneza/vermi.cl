import { promises as fs } from "node:fs";
import path from "node:path";

const workspaceRoot = "C:/Users/fanun/Code/vermi.cl";
const blogDir = path.join(workspaceRoot, "src/content/blog");
const assetsDir = path.join(workspaceRoot, "src/assets/blog");

const allowedTags = [
  "alimentacion-de-lombrices",
  "residuos-de-cocina",
  "material-seco",
  "humedad-y-aireacion",
  "temperatura-y-clima",
  "problemas-y-olores",
  "fugas-de-lombrices",
  "vermicompostaje-en-departamento",
  "cosecha-de-humus",
  "humus-de-lombriz",
  "lixiviado-y-te-de-humus",
  "lombrices-californianas",
];

// Mapping from other tags to allowed tags
const tagMapping = {
  "eisenia-fetida": "lombrices-californianas",
  vermicompostera: "vermicompostaje-en-departamento",
  "vermicompostaje-en-casa": "vermicompostaje-en-departamento",
  "residuos-organicos": "residuos-de-cocina",
  "cama-vermicompostera": "material-seco",
  sustrato: "material-seco",
  humedad: "humedad-y-aireacion",
  aireacion: "humedad-y-aireacion",
  temperatura: "temperatura-y-clima",
  clima: "temperatura-y-clima",
  "abono-organico": "humus-de-lombriz",
  jardineria: "humus-de-lombriz",
  macetas: "humus-de-lombriz",
  invierno: "temperatura-y-clima",
  plagas: "problemas-y-olores",
  hormigas: "problemas-y-olores",
  velocidad: "alimentacion-de-lombrices",
  tiempo: "alimentacion-de-lombrices",
  lombricultura: "lombrices-californianas",
};

// Map of image inputs for each of the 12 files
const articlesImageConfig = {
  "cuantas-lombrices-necesito.mdx": {
    images: [
      {
        src: "src/assets/blog/evitar-fuga-lombrices.jpeg",
        target: "evitar-fuga-lombrices.jpeg",
        exists: true,
      },
      {
        src: "C:/Users/fanun/Downloads/jonathan-kemper-YD5TvbPgmQc-unsplash.jpg",
        target: "lombrices-jonathan-kemper.jpg",
        alt: "Primer plano de lombrices californianas en sustrato húmedo",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.37 (17).jpeg",
        target: "lombrices-caja-whatsapp.jpeg",
        alt: "Colonia de lombrices californianas listas para iniciar la vermicompostera",
      },
    ],
  },
  "cuanto-demora-vermicompostaje.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/28866055336_cdb02ac0a5_k.jpg",
        target: "tiempo-vermicompostaje-flickr.jpg",
        credit:
          "Imagen de portada por [Oregon State University](https://www.flickr.com/photos/oregonstateuniversity/28866055336) (CC BY-SA).",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.36.jpeg",
        target: "tiempo-cosecha-whatsapp.jpeg",
        alt: "Humus de lombriz maduro y listo para cosechar",
      },
    ],
  },
  "elegir-vermicompostera.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.37 (2).jpeg",
        target: "elegir-vermicompostera-modelo.jpeg",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.36 (2).jpeg",
        target: "vermicompostera-madera-whatsapp.jpeg",
        alt: "Vermicompostera de madera instalada en un jardín",
      },
    ],
  },
  "hormigas-vermicompostera.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/eugene-kucheruk-zfGoFc7C0x8-unsplash.jpg",
        target: "hormigas-eugene-kucheruk.jpg",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-25 at 18.52.28 (2).jpeg",
        target: "hormigas-vermicompostera-whatsapp.jpeg",
        alt: "Control y revisión de una vermicompostera para evitar hormigas",
      },
    ],
  },
  "humedad-vermicompostera.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/4432285980_a613c757d6_k.jpg",
        target: "humedad-vermicompostera-flickr.jpg",
        credit:
          "Imagen de portada por [jlevine](https://www.flickr.com/photos/jlevine/4432285980) (CC BY-SA).",
      },
      {
        src: "src/assets/blog/compostera-departamento-ubicacion.jpeg",
        target: "compostera-departamento-ubicacion.jpeg",
        exists: true,
        alt: "Ubicación ideal para una vermicompostera en el balcón",
      },
    ],
  },
  "humus-con-plasticos.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/marc-newberry-9vcEn3BJyy8-unsplash.jpg",
        target: "humus-plasticos-marc-newberry.jpg",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-30 at 21.06.48.jpeg",
        target: "humus-microplasticos-whatsapp.jpeg",
        alt: "Humus procesado libre de partículas plásticas",
      },
    ],
  },
  "multiplicar-lombrices.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/4185597207_748c770083_o.jpg",
        target: "multiplicar-lombrices-flickr.jpg",
        credit:
          "Imagen de portada por [timothymnz](https://www.flickr.com/photos/timothymnz/4185597207) (CC BY-SA).",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.37 (13).jpeg",
        target: "lombrices-reproduccion-whatsapp.jpeg",
        alt: "Gran cantidad de lombrices multiplicándose en sustrato adecuado",
      },
    ],
  },
  "preparar-cama-vermicompostera.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.37 (6).jpeg",
        target: "preparar-sustrato-caja-whatsapp.jpeg",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.36 (6).jpeg",
        target: "sustrato-humedad-whatsapp.jpeg",
        alt: "Sustrato inicial con humedad óptima para las lombrices",
      },
    ],
  },
  "que-no-usar-cama-vermicompostera.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.36 (8).jpeg",
        target: "no-usar-sustrato-desechos-whatsapp.jpeg",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.37.jpeg",
        target: "no-usar-sustrato-quimicos-whatsapp.jpeg",
        alt: "Revisión de cartón para evitar tintas y adhesivos nocivos",
      },
    ],
  },
  "temperatura-lombrices.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/3088133721_c1c55242e5_k.jpg",
        target: "temperatura-lombrices-flickr.jpg",
        credit:
          "Imagen de portada por [mely-o](https://www.flickr.com/photos/mely-o/3088133721) (CC BY-NC-SA).",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-25 at 18.52.28 (4).jpeg",
        target: "temperatura-lombrices-verano-whatsapp.jpeg",
        alt: "Medición y cuidado de la temperatura en la vermicompostera",
      },
    ],
  },
  "usar-humus-maceteros.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/neslihan-gunaydin-BduDcrySLKM-unsplash.jpg",
        target: "humus-maceteros-neslihan.jpg",
      },
      {
        src: "C:/Users/fanun/Downloads/markus-spiske-FwW5fhFKM6k-unsplash (1).jpg",
        target: "humus-maceteros-markus-spiske.jpg",
        alt: "Plantas sanas creciendo en maceteros fertilizados con humus de lombriz",
      },
    ],
  },
  "vermicompostaje-invierno.mdx": {
    images: [
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.37 (16).jpeg",
        target: "vermicompostaje-invierno-proteccion-whatsapp.jpeg",
      },
      {
        src: "C:/Users/fanun/Downloads/Fran/WhatsApp Image 2026-06-28 at 21.13.37 (17).jpeg",
        target: "lombrices-caja-whatsapp.jpeg",
        alt: "Lombrices protegidas en su sustrato durante la temporada invernal",
      },
      {
        src: "src/assets/blog/compostera-departamento-interior.jpeg",
        target: "compostera-departamento-interior.jpeg",
        exists: true,
        alt: "Vermicompostera resguardada en el interior del hogar en invierno",
      },
    ],
  },
};

async function run() {
  console.log("Starting processing of articles...");

  // 1. Copy local/download images that don't exist in project
  for (const [filename, config] of Object.entries(articlesImageConfig)) {
    for (const img of config.images) {
      if (img.exists) {
        console.log(
          `Image ${img.target} already exists in project, skipping copy.`,
        );
        continue;
      }
      const destPath = path.join(assetsDir, img.target);
      try {
        await fs.access(destPath);
        console.log(`Image ${img.target} already copied, skipping.`);
      } catch {
        console.log(`Copying ${img.src} -> ${destPath}`);
        await fs.copyFile(img.src, destPath);
      }
    }
  }

  // 2. Calculate pubDates going 13 days back starting 2026-07-01
  const files = await fs.readdir(blogDir);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx")).sort();
  console.log(`Found ${mdxFiles.length} MDX files.`);

  // Dates list
  const baseDate = new Date("2026-07-01T12:00:00-04:00");
  const dates = [];
  for (let i = 0; i < mdxFiles.length; i++) {
    const d = new Date(baseDate.getTime() - i * 13 * 24 * 60 * 60 * 1000);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
  }
  console.log("Calculated dates:", dates);

  const fileToDate = {};
  for (let i = 0; i < mdxFiles.length; i++) {
    fileToDate[mdxFiles[i]] = dates[i];
  }

  // 3. Process each MDX file
  for (const file of mdxFiles) {
    const filePath = path.join(blogDir, file);
    let content = await fs.readFile(filePath, "utf8");

    // Split frontmatter and body
    const parts = content.split("---");
    if (parts.length < 3) {
      console.error(`Invalid frontmatter structure in ${file}`);
      continue;
    }

    let frontmatter = parts[1];
    let body = parts.slice(2).join("---");

    // Set pubDate
    const newDate = fileToDate[file];
    frontmatter = frontmatter.replace(/pubDate:\s*\S+/g, `pubDate: ${newDate}`);

    // Map invalid categories to allowed ones
    frontmatter = frontmatter.replace(
      /category:\s*Materiales/g,
      "category: Manual",
    );
    frontmatter = frontmatter.replace(
      /category:\s*Uso del humus/g,
      "category: Cosecha",
    );

    // Update tags if it is one of the 12 files
    const config = articlesImageConfig[file];
    if (config) {
      // Parse tags
      const tagsMatch = frontmatter.match(/tags:\s*\n((?:\s*-\s*\S+\s*\n?)+)/);
      if (tagsMatch) {
        const originalTagsText = tagsMatch[1];
        const tags = originalTagsText
          .split("\n")
          .map((t) => t.replace(/^\s*-\s*/, "").trim())
          .filter((t) => t.length > 0);

        let newTags = tags
          .map((tag) => {
            if (allowedTags.includes(tag)) return tag;
            if (tagMapping[tag]) return tagMapping[tag];
            return null;
          })
          .filter(Boolean);

        // De-duplicate
        newTags = [...new Set(newTags)];

        // Ensure length constraints
        if (newTags.length < 2) {
          if (!newTags.includes("lombrices-californianas")) {
            newTags.push("lombrices-californianas");
          }
          if (newTags.length < 2 && !newTags.includes("residuos-de-cocina")) {
            newTags.push("residuos-de-cocina");
          }
        }
        if (newTags.length > 5) {
          newTags = newTags.slice(0, 5);
        }

        const newTagsText = newTags.map((t) => `  - ${t}`).join("\n") + "\n";
        frontmatter = frontmatter.replace(tagsMatch[1], newTagsText);
      }

      // Update heroImage in frontmatter
      const heroImgConfig = config.images[0];
      const targetHeroPath = `../../assets/blog/${heroImgConfig.target}`;
      frontmatter = frontmatter.replace(
        /heroImage:\s*["']?[^"'\n]+["']?/g,
        `heroImage: "${targetHeroPath}"`,
      );
    }

    // Body changes:
    // a. Spanish/Chilean localization rules
    // Avoid: gusano, bicho, basura, lecho, cama, humus líquido
    // Prefer: lombriz, insecto, residuos, sustrato, sustrato, lixiviado
    const replacements = [
      { from: /\bmacetas\b/g, to: "maceteros" },
      { from: /\bmaceta\b/g, to: "macetero" },
      { from: /\bMacetas\b/g, to: "Maceteros" },
      { from: /\bMaceta\b/g, to: "Macetero" },
      { from: /\bgusanos\b/g, to: "lombrices" },
      { from: /\bgusano\b/g, to: "lombriz" },
      { from: /\bGusanos\b/g, to: "Lombrices" },
      { from: /\bGusano\b/g, to: "Lombriz" },
      { from: /\bbichos\b/g, to: "insectos" },
      { from: /\bbicho\b/g, to: "insecto" },
      { from: /\bBichos\b/g, to: "Insectos" },
      { from: /\bBicho\b/g, to: "Insecto" },
      { from: /\bbasuras\b/g, to: "residuos" },
      { from: /\bbasura\b/g, to: "residuos" },
      { from: /\bBasuras\b/g, to: "Residuos" },
      { from: /\bBasura\b/g, to: "Residuos" },
      { from: /\blechos\b/g, to: "sustratos" },
      { from: /\blecho\b/g, to: "sustrato" },
      { from: /\bLechos\b/g, to: "Sustratos" },
      { from: /\bLecho\b/g, to: "Sustrato" },
      { from: /\bcamas\b/g, to: "sustratos" },
      { from: /\bcama\b/g, to: "sustrato" },
      { from: /\bCamas\b/g, to: "Sustratos" },
      { from: /\bCama\b/g, to: "Sustrato" },
      { from: /\bhumus líquido\b/g, to: "lixiviado" },
      { from: /\bHumus líquido\b/g, to: "Lixiviado" },
      { from: /\bhumus-líquido\b/g, to: "lixiviado" },
    ];

    // Apply replacements on both frontmatter and body
    for (const rep of replacements) {
      frontmatter = frontmatter.replace(rep.from, rep.to);
      body = body.replace(rep.from, rep.to);
    }

    // Clean up headings periods
    body = body.replace(/^(#{2,6}\s+.*)\.\s*$/gm, "$1");

    // b. Place body images if it is one of the 12 files
    if (config && config.images.length > 1) {
      // Find all heading 2 markers (e.g. "## 1. ...")
      const headings = [];
      const lines = body.split("\n");
      for (let idx = 0; idx < lines.length; idx++) {
        if (lines[idx].startsWith("## ")) {
          headings.push(idx);
        }
      }

      const bodyImages = config.images.slice(1);

      // Let's only insert if the image is not already referenced in the body to keep it idempotent
      const insertIndices = [];
      if (bodyImages.length === 1) {
        if (headings.length > 0) {
          const midIdx = Math.floor(headings.length / 2);
          insertIndices.push(headings[midIdx]);
        }
      } else if (bodyImages.length === 2) {
        if (headings.length >= 2) {
          const idx1 = Math.floor(headings.length / 3);
          const idx2 = Math.floor((2 * headings.length) / 3);
          insertIndices.push(headings[idx1], headings[idx2]);
        } else if (headings.length === 1) {
          insertIndices.push(headings[0], lines.length - 1);
        }
      }

      // Check if any body image is already in the file
      let alreadyHasImages = false;
      for (const img of bodyImages) {
        if (body.includes(img.target)) {
          alreadyHasImages = true;
          break;
        }
      }

      if (!alreadyHasImages && insertIndices.length > 0) {
        // Insert images at calculated lines (inserting from end to beginning so indices don't shift)
        for (let k = insertIndices.length - 1; k >= 0; k--) {
          const lineNum = insertIndices[k];
          const img = bodyImages[k];
          const imgMd = `\n![${img.alt || "Imagen descriptiva"}](../../assets/blog/${img.target})\n`;
          lines.splice(lineNum, 0, imgMd);
        }
        body = lines.join("\n");
      }
    }

    // c. Add credit section at the bottom for CC photos if not already present
    if (config) {
      const heroConfig = config.images[0];
      if (heroConfig.credit && !body.includes(heroConfig.credit)) {
        body = body.trimEnd() + `\n\n---\n\n${heroConfig.credit}\n`;
      }
    }

    // Gender agreement fixes for "sustrato" (masculine) which replaced "cama" (feminine)
    const genderFixes = [
      { from: /\bla sustrato\b/gi, to: "el sustrato" },
      { from: /\buna sustrato\b/gi, to: "un sustrato" },
      { from: /\bde la sustrato\b/gi, to: "del sustrato" },
      { from: /\bhumedecerla\b/gi, to: "humedecerlo" },
      { from: /\bhumedecerlas\b/gi, to: "humedecerlos" },
      { from: /\ba la sustrato\b/gi, to: "al sustrato" },
      { from: /\blas sustratos\b/gi, to: "los sustratos" },
      { from: /\bunas sustratos\b/gi, to: "unos sustratos" },
      { from: /\bde las sustratos\b/gi, to: "de los sustratos" },
      { from: /\ba las sustratos\b/gi, to: "a los sustratos" },
      { from: /\bsustrato húmeda\b/gi, to: "sustrato húmedo" },
      { from: /\bsustratos húmedas\b/gi, to: "sustratos húmedos" },
      { from: /\bsustrato seca\b/gi, to: "sustrato seco" },
      { from: /\bsustratos secas\b/gi, to: "sustratos secos" },
      { from: /\bsustrato empapada\b/gi, to: "sustrato empapado" },
      { from: /\bsustratos empapadas\b/gi, to: "sustratos empapados" },
      { from: /\bsustrato saturada\b/gi, to: "sustrato saturado" },
      { from: /\bsustratos saturadas\b/gi, to: "sustratos saturados" },
      { from: /\bsustrato madura\b/gi, to: "sustrato maduro" },
      { from: /\bsustratos maduras\b/gi, to: "sustratos maduros" },
      { from: /\bsustrato limpia\b/gi, to: "sustrato limpio" },
      { from: /\bsustratos limpias\b/gi, to: "sustratos limpios" },
      { from: /\bsustrato porosa\b/gi, to: "sustrato poroso" },
      { from: /\bsustratos porosas\b/gi, to: "sustratos porosos" },
      { from: /\bsustrato bien preparada\b/gi, to: "sustrato bien preparado" },
      {
        from: /\bsustratos bien preparadas\b/gi,
        to: "sustratos bien preparados",
      },
      {
        from: /\bsustrato inicial preparada\b/gi,
        to: "sustrato inicial preparado",
      },
      { from: /\bsustrato preparada\b/gi, to: "sustrato preparado" },
      {
        from: /\bsustrato inicial bien preparada\b/gi,
        to: "sustrato inicial bien preparado",
      },
      { from: /\bsustrato bien ventilada\b/gi, to: "sustrato bien ventilado" },
    ];

    for (const fix of genderFixes) {
      const replaceFn = (match) => {
        if (match.startsWith("L"))
          return fix.to.charAt(0).toUpperCase() + fix.to.slice(1);
        if (match.startsWith("U"))
          return fix.to.charAt(0).toUpperCase() + fix.to.slice(1);
        if (match.startsWith("E"))
          return fix.to.charAt(0).toUpperCase() + fix.to.slice(1);
        if (match.startsWith("D"))
          return fix.to.charAt(0).toUpperCase() + fix.to.slice(1);
        if (match.startsWith("A"))
          return fix.to.charAt(0).toUpperCase() + fix.to.slice(1);
        return fix.to;
      };
      frontmatter = frontmatter.replace(fix.from, replaceFn);
      body = body.replace(fix.from, replaceFn);
    }

    // Save back to file
    const newContent = `---${frontmatter}---${body}`;
    await fs.writeFile(filePath, newContent, "utf8");
    console.log(`Successfully processed ${file}`);
  }

  // 4. Update public/llms.txt and public/llms-full.txt
  console.log("Updating public/llms.txt and public/llms-full.txt...");

  // Read all posts details
  const postDetails = [];
  for (const file of mdxFiles) {
    const filePath = path.join(blogDir, file);
    const content = await fs.readFile(filePath, "utf8");
    const parts = content.split("---");
    if (parts.length >= 3) {
      const fmText = parts[1];
      const titleMatch = fmText.match(/title:\s*["']?([^"'\n]+)["']?/);
      const descMatch = fmText.match(/description:\s*["']?([^"'\n]+)["']?/);
      const title = titleMatch ? titleMatch[1] : file;
      const description = descMatch ? descMatch[1] : "";

      // Extract first heading list (puntos clave) from the body
      const bodyLines = parts.slice(2).join("---").split("\n");
      const keyPoints = [];
      for (const line of bodyLines) {
        if (line.startsWith("## ") && keyPoints.length < 5) {
          const headingText = line.replace(/^##\s*(?:\d+\.\s*)?/, "").trim();
          keyPoints.push(headingText);
        }
      }
      postDetails.push({
        slug: file.replace(/\.mdx$/, ""),
        title,
        description,
        keyPoints,
      });
    }
  }

  // Generate public/llms.txt
  const llmsTxt = `# vermi.cl - Lombricultura doméstica en Chile

> Portal educativo dedicado al vermicompostaje doméstico, reciclaje orgánico y biología del suelo adaptado al clima de Chile.

## Canales principales
- [Inicio](https://vermi.cl/) (contiene buscador "¿Puedo echarle esto?")
- [Guías y manuales](https://vermi.cl/blog/)
- [Canal RSS](https://vermi.cl/feed.xml)

## Guías del repositorio
${postDetails.map((p) => `- [${p.title}](https://vermi.cl/blog/${p.slug}/)`).join("\n")}

## Etiquetas principales
- [Alimentación de lombrices](https://vermi.cl/blog/tags/alimentacion-de-lombrices/)
- [Material seco](https://vermi.cl/blog/tags/material-seco/)
- [Humedad y aireación](https://vermi.cl/blog/tags/humedad-y-aireacion/)
- [Temperatura y clima](https://vermi.cl/blog/tags/temperatura-y-clima/)
- [Problemas y olores](https://vermi.cl/blog/tags/problemas-y-olores/)
- [Humus de lombriz](https://vermi.cl/blog/tags/humus-de-lombriz/)

## Optional
- [Manual completo para LLMs](https://vermi.cl/llms-full.txt) - Versión completa e indexable de todos los contenidos.
`;
  await fs.writeFile(
    path.join(workspaceRoot, "public/llms.txt"),
    llmsTxt,
    "utf8",
  );

  // Generate public/llms-full.txt
  let llmsFullTxt = `# vermi.cl - Manual completo de lombricultura en Chile

Este archivo contiene el compendio educativo completo de vermi.cl para el consumo de motores de búsqueda de Inteligencia Artificial (LLM context indexing).

---

## Etiquetas de contenido

Estas rutas agrupan el contenido por temas canónicos:

- Alimentación de lombrices: https://vermi.cl/blog/tags/alimentacion-de-lombrices/
- Residuos de cocina: https://vermi.cl/blog/tags/residuos-de-cocina/
- Material seco: https://vermi.cl/blog/tags/material-seco/
- Humedad y aireación: https://vermi.cl/blog/tags/humedad-y-aireacion/
- Temperatura y clima: https://vermi.cl/blog/tags/temperatura-y-clima/
- Problemas y olores: https://vermi.cl/blog/tags/problemas-y-olores/
- Fugas de lombrices: https://vermi.cl/blog/tags/fugas-de-lombrices/
- Vermicompostaje en departamento: https://vermi.cl/blog/tags/vermicompostaje-en-departamento/
- Cosecha de humus: https://vermi.cl/blog/tags/cosecha-de-humus/
- Humus de lombriz: https://vermi.cl/blog/tags/humus-de-lombriz/
- Lixiviado y té de humus: https://vermi.cl/blog/tags/lixiviado-y-te-de-humus/
- Lombrices californianas: https://vermi.cl/blog/tags/lombrices-californianas/

---
`;

  for (let idx = 0; idx < postDetails.length; idx++) {
    const p = postDetails[idx];
    llmsFullTxt += `
## ${idx + 1}. ${p.title}
URL de Referencia: [https://vermi.cl/blog/${p.slug}/](https://vermi.cl/blog/${p.slug}/)

${p.description}

### Estructura y puntos de control
${p.keyPoints.map((kp) => `*   ${kp}`).join("\n")}

---
`;
  }

  await fs.writeFile(
    path.join(workspaceRoot, "public/llms-full.txt"),
    llmsFullTxt,
    "utf8",
  );
  console.log("llms.txt and llms-full.txt successfully updated!");
}

run().catch(console.error);
