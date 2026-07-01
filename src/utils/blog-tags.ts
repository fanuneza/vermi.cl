export const BLOG_TAGS = [
  {
    slug: "alimentacion-de-lombrices",
    label: "Alimentación de lombrices",
    description:
      "Guías sobre residuos orgánicos, frecuencia de alimentación y equilibrio del sustrato.",
  },
  {
    slug: "residuos-de-cocina",
    label: "Residuos de cocina",
    description:
      "Qué restos domésticos usar, cuáles moderar y cómo prepararlos antes de agregarlos.",
  },
  {
    slug: "material-seco",
    label: "Material seco",
    description:
      "Cartón, papel, hojas secas y otros aportes cafés que regulan humedad y aireación.",
  },
  {
    slug: "humedad-y-aireacion",
    label: "Humedad y aireación",
    description:
      "Manejo del agua, oxígeno y estructura física dentro de la vermicompostera.",
  },
  {
    slug: "temperatura-y-clima",
    label: "Temperatura y clima",
    description:
      "Cuidados frente al calor, frío, sol directo y condiciones habituales en Chile.",
  },
  {
    slug: "problemas-y-olores",
    label: "Problemas y olores",
    description:
      "Diagnóstico de malos olores, mosquitas, putrefacción y desequilibrios comunes.",
  },
  {
    slug: "fugas-de-lombrices",
    label: "Fugas de lombrices",
    description:
      "Causas y soluciones cuando las lombrices intentan escapar del sistema.",
  },
  {
    slug: "vermicompostaje-en-departamento",
    label: "Vermicompostaje en departamento",
    description:
      "Instalación y manejo de vermicomposteras en balcones, logias y espacios urbanos.",
  },
  {
    slug: "cosecha-de-humus",
    label: "Cosecha de humus",
    description:
      "Separación de lombrices, harneado, madurez y almacenamiento del humus.",
  },
  {
    slug: "humus-de-lombriz",
    label: "Humus de lombriz",
    description:
      "Uso, conservación y calidad del vermicompost maduro producido en casa.",
  },
  {
    slug: "lixiviado-y-te-de-humus",
    label: "Lixiviado y té de humus",
    description:
      "Diferencias entre líquidos de drenaje, extractos aireados y aplicaciones seguras.",
  },
  {
    slug: "lombrices-californianas",
    label: "Lombrices californianas",
    description:
      "Biología, adaptación y manejo de *Eisenia fetida* en vermicomposteras domésticas.",
  },
] as const;

export type BlogTagSlug = (typeof BLOG_TAGS)[number]["slug"];

export const BLOG_TAG_SLUGS = BLOG_TAGS.map((tag) => tag.slug) as [
  BlogTagSlug,
  ...BlogTagSlug[],
];

export function getBlogTag(slug: string) {
  return BLOG_TAGS.find((tag) => tag.slug === slug);
}

export function getBlogTagLabel(slug: string) {
  return getBlogTag(slug)?.label ?? slug;
}

export function getBlogTagDescription(slug: string) {
  return getBlogTag(slug)?.description ?? "";
}

export function getUsedBlogTags(
  posts: Array<{ data: { tags: readonly BlogTagSlug[] } }>,
) {
  const used = new Set(posts.flatMap((post) => post.data.tags));
  return BLOG_TAGS.filter((tag) => used.has(tag.slug));
}
