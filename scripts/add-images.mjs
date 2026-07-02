import { promises as fs } from "node:fs";
import path from "node:path";

const workspaceRoot = "C:/Users/fanun/Code/vermi.cl";
const blogDir = path.join(workspaceRoot, "src/content/blog");

const articleBodyImages = {
  "cosechar-humus.mdx": [
    {
      target: "tiempo-cosecha-whatsapp.jpeg",
      alt: "Humus de lombriz maduro y listo para cosechar",
    },
    {
      target: "lombrices-caja-whatsapp.jpeg",
      alt: "Colonia de lombrices californianas listas para continuar el proceso",
    },
    {
      target: "humus-maceteros-markus-spiske.jpg",
      alt: "Humus de lombriz aplicado en maceteros de jardín",
    },
  ],
  "evitar-fuga-lombrices.mdx": [
    {
      target: "lombrices-jonathan-kemper.jpg",
      alt: "Primer plano de lombrices en sustrato húmedo",
    },
    {
      target: "humedad-vermicompostera-flickr.jpg",
      alt: "Revisión de humedad en el sustrato",
    },
    {
      target: "compostera-departamento-interior.jpeg",
      alt: "Ubicación segura para la vermicompostera en interior",
    },
  ],
  "que-alimentos-no-dar.mdx": [
    {
      target: "lombrices-jonathan-kemper.jpg",
      alt: "Lombrices alimentándose de materia orgánica",
    },
    {
      target: "no-usar-sustrato-desechos-whatsapp.jpeg",
      alt: "Desechos de cartón adecuados para mezcla seca",
    },
    {
      target: "humus-microplasticos-whatsapp.jpeg",
      alt: "Humus cosechado de alta calidad libre de residuos",
    },
  ],
  "vermi-en-departamento.mdx": [
    {
      target: "compostera-departamento-ubicacion.jpeg",
      alt: "Ubicación ideal de la vermicompostera en el balcón",
    },
    {
      target: "compostera-departamento-interior.jpeg",
      alt: "Vermicompostera resguardada en el interior del departamento",
    },
    {
      target: "elegir-vermicompostera-modelo.jpeg",
      alt: "Modelos de vermicomposteras compactas para departamentos",
    },
  ],
  "cuantas-lombrices-necesito.mdx": [
    {
      target: "lombrices-jonathan-kemper.jpg",
      alt: "Primer plano de lombrices californianas en sustrato húmedo",
    },
    {
      target: "lombrices-caja-whatsapp.jpeg",
      alt: "Colonia de lombrices californianas listas para iniciar la vermicompostera",
    },
    {
      target: "lombrices-reproduccion-whatsapp.jpeg",
      alt: "Lombrices rojas en plena etapa de reproducción",
    },
  ],
  "cuanto-demora-vermicompostaje.mdx": [
    {
      target: "tiempo-cosecha-whatsapp.jpeg",
      alt: "Humus maduro y listo para cosechar",
    },
    {
      target: "cosechar-humus.jpeg",
      alt: "Proceso de cosecha y separación de lombrices",
    },
    {
      target: "humus-maceteros-neslihan.jpg",
      alt: "Plantas sanas abonadas con humus de lombriz terminado",
    },
  ],
  "elegir-vermicompostera.mdx": [
    {
      target: "vermicompostera-madera-whatsapp.jpeg",
      alt: "Vermicompostera de madera instalada en un jardín",
    },
    {
      target: "compostera-en-balcon.jpg",
      alt: "Vermicompostera compacta en el balcón de un departamento",
    },
    {
      target: "compostera-departamento-ubicacion.jpeg",
      alt: "Ubicación y protección del sol directo",
    },
  ],
  "hormigas-vermicompostera.mdx": [
    {
      target: "hormigas-vermicompostera-whatsapp.jpeg",
      alt: "Control y revisión de una vermicompostera para evitar hormigas",
    },
    {
      target: "compostera-departamento-ubicacion.jpeg",
      alt: "Uso de barreras físicas para proteger la vermicompostera",
    },
    {
      target: "sustrato-humedad-whatsapp.jpeg",
      alt: "Nivel de humedad adecuado en el sustrato para alejar hormigas",
    },
  ],
  "humedad-vermicompostera.mdx": [
    {
      target: "compostera-departamento-ubicacion.jpeg",
      alt: "Revisión de humedad en la vermicompostera en el balcón",
    },
    {
      target: "sustrato-humedad-whatsapp.jpeg",
      alt: "Prueba del puño para comprobar la humedad óptima",
    },
    {
      target: "no-usar-sustrato-quimicos-whatsapp.jpeg",
      alt: "Incorporación de cartón picado para absorber exceso de agua",
    },
  ],
  "humus-con-plasticos.mdx": [
    {
      target: "humus-microplasticos-whatsapp.jpeg",
      alt: "Humus procesado libre de partículas plásticas",
    },
    {
      target: "no-usar-sustrato-desechos-whatsapp.jpeg",
      alt: "Revisión de cartón para retirar plásticos adheridos",
    },
    {
      target: "cosechar-humus.jpeg",
      alt: "Harneado del humus para eliminar cualquier residuo inorgánico",
    },
  ],
  "multiplicar-lombrices.mdx": [
    {
      target: "lombrices-reproduccion-whatsapp.jpeg",
      alt: "Gran cantidad de lombrices multiplicándose en sustrato adecuado",
    },
    {
      target: "lombrices-jonathan-kemper.jpg",
      alt: "Lombrices californianas sanas y activas",
    },
    {
      target: "lombrices-caja-whatsapp.jpeg",
      alt: "Población de lombrices rojas con sustrato nutritivo",
    },
  ],
  "preparar-cama-vermicompostera.mdx": [
    {
      target: "sustrato-humedad-whatsapp.jpeg",
      alt: "Sustrato inicial con humedad óptima para las lombrices",
    },
    {
      target: "no-usar-sustrato-quimicos-whatsapp.jpeg",
      alt: "Revisión de cartón libre de tintas o plásticos",
    },
    {
      target: "lombrices-caja-whatsapp.jpeg",
      alt: "Instalación de la colonia de lombrices en su nuevo sustrato",
    },
  ],
  "que-no-usar-cama-vermicompostera.mdx": [
    {
      target: "no-usar-sustrato-quimicos-whatsapp.jpeg",
      alt: "Revisión de cartón para evitar tintas y adhesivos nocivos",
    },
    {
      target: "humus-microplasticos-whatsapp.jpeg",
      alt: "Humus cosechado de alta calidad y libre de microplásticos",
    },
    {
      target: "compostera-departamento-interior.jpeg",
      alt: "Revisión periódica de los materiales en la vermicompostera",
    },
  ],
  "temperatura-lombrices.mdx": [
    {
      target: "temperatura-lombrices-verano-whatsapp.jpeg",
      alt: "Medición y cuidado de la temperatura en la vermicompostera",
    },
    {
      target: "vermicompostaje-invierno-proteccion-whatsapp.jpeg",
      alt: "Protección térmica contra heladas de invierno",
    },
    {
      target: "compostera-departamento-ubicacion.jpeg",
      alt: "Ubicación sombreada para evitar golpes de calor",
    },
  ],
  "usar-humus-maceteros.mdx": [
    {
      target: "humus-maceteros-markus-spiske.jpg",
      alt: "Plantas sanas creciendo en maceteros fertilizados con humus",
    },
    {
      target: "cosechar-humus.jpeg",
      alt: "Humus de lombriz recién cosechado y listo para aplicar",
    },
    {
      target: "tiempo-cosecha-whatsapp.jpeg",
      alt: "Textura suelta y fina del humus de lombriz de alta calidad",
    },
  ],
  "vermicompostaje-invierno.mdx": [
    {
      target: "lombrices-caja-whatsapp.jpeg",
      alt: "Lombrices protegidas en su sustrato durante la temporada invernal",
    },
    {
      target: "compostera-departamento-interior.jpeg",
      alt: "Vermicompostera resguardada en el interior del hogar en invierno",
    },
    {
      target: "temperatura-lombrices-verano-whatsapp.jpeg",
      alt: "Revisión y monitoreo del sustrato en días fríos",
    },
  ],
};

async function run() {
  console.log("Adding 3 body images to all 16 blog posts...");
  const files = await fs.readdir(blogDir);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  for (const file of mdxFiles) {
    const config = articleBodyImages[file];
    if (!config) {
      console.warn(`No config found for ${file}`);
      continue;
    }

    const filePath = path.join(blogDir, file);
    let content = await fs.readFile(filePath, "utf8");

    // Split frontmatter and body
    const parts = content.split("---");
    if (parts.length < 3) {
      console.error(`Invalid structure in ${file}`);
      continue;
    }

    let frontmatter = parts[1];
    let body = parts.slice(2).join("---");

    // Clean any existing inline body images (regex matching standard markdown images referencing assets/blog/)
    body = body.replace(
      /\n*!\[[^\]]*\]\(\.\.\/\.\.\/assets\/blog\/[^\)]+\)\n*/g,
      "\n",
    );

    // Find all level-2 headings
    const lines = body.split("\n");
    const headings = [];
    for (let idx = 0; idx < lines.length; idx++) {
      if (lines[idx].startsWith("## ")) {
        headings.push(idx);
      }
    }

    if (headings.length < 3) {
      console.warn(
        `Post ${file} has only ${headings.length} headings. Using fallbacks.`,
      );
    }

    // Determine insert locations
    const insertIndices = [];
    if (headings.length >= 3) {
      const idx1 = Math.floor(headings.length / 4);
      const idx2 = Math.floor((2 * headings.length) / 4);
      const idx3 = Math.floor((3 * headings.length) / 4);
      insertIndices.push(headings[idx1], headings[idx2], headings[idx3]);
    } else if (headings.length === 2) {
      insertIndices.push(headings[0], headings[1], lines.length - 1);
    } else if (headings.length === 1) {
      insertIndices.push(
        headings[0],
        Math.floor(lines.length / 2),
        lines.length - 1,
      );
    } else {
      insertIndices.push(
        Math.floor(lines.length / 4),
        Math.floor((2 * lines.length) / 4),
        Math.floor((3 * lines.length) / 4),
      );
    }

    // Insert the 3 body images from bottom to top to avoid index shifting
    for (let k = 2; k >= 0; k--) {
      const lineNum = insertIndices[k];
      const img = config[k];
      const imgMd = `\n![${img.alt}](../../assets/blog/${img.target})\n`;
      lines.splice(lineNum, 0, imgMd);
    }

    body = lines.join("\n");

    const newContent = `---${frontmatter}---${body}`;
    await fs.writeFile(filePath, newContent, "utf8");
    console.log(
      `Processed ${file}: successfully inserted 3 equidistant body images.`,
    );
  }

  console.log("Successfully completed adding 3 body images to all 16 posts!");
}

run().catch(console.error);
