export const BLOG_CATEGORIES = [
  "Manual",
  "Alimentación",
  "Problemas",
  "Cosecha",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const blogCardCategoryMeta: Record<
  BlogCategory,
  {
    bg: string;
    tagBg: string;
    tagText: string;
    label: string;
  }
> = {
  Manual: {
    bg: "bg-[#FFFDF0]",
    tagBg: "bg-primary",
    tagText: "text-white",
    label: "MANUAL DE INICIO",
  },
  Alimentación: {
    bg: "bg-secondary-fixed",
    tagBg: "bg-secondary",
    tagText: "text-white",
    label: "ALIMENTACIÓN",
  },
  Problemas: {
    bg: "bg-mustard",
    tagBg: "bg-error",
    tagText: "text-white",
    label: "SOLUCIÓN DE PROBLEMAS",
  },
  Cosecha: {
    bg: "bg-primary-fixed",
    tagBg: "bg-primary",
    tagText: "text-white",
    label: "COSECHA Y HUMUS",
  },
};

export const blogPostCategoryMeta: Record<
  BlogCategory,
  {
    tagBg: string;
    tagText: string;
    label: string;
  }
> = {
  Manual: {
    tagBg: "bg-tertiary-fixed",
    tagText: "text-on-tertiary-fixed",
    label: "GUÍA PRÁCTICA",
  },
  Alimentación: {
    tagBg: "bg-secondary-fixed",
    tagText: "text-on-secondary-fixed",
    label: "ALIMENTACIÓN",
  },
  Problemas: {
    tagBg: "bg-mustard",
    tagText: "text-on-background",
    label: "SOLUCIÓN DE PROBLEMAS",
  },
  Cosecha: {
    tagBg: "bg-primary-fixed",
    tagText: "text-on-background",
    label: "COSECHA",
  },
};

export const blogFeatureImageWidths = [320, 480, 640, 768] as const;
export const blogFeatureImageSizes =
  "(max-width: 768px) calc(100vw - 2rem), 768px";

export const blogCardImageWidths = [240, 320, 360, 400, 480] as const;
export const blogCardImageSizes =
  "(max-width: 768px) calc(100vw - 3rem), (max-width: 1024px) calc(50vw - 3rem), 320px";

export const articleImageWidths = [360, 640, 768, 960] as const;
export const articleImageSizes =
  "(max-width: 480px) 100vw, (max-width: 1024px) 768px, 960px";

export function formatBlogDate(date: Date) {
  return date
    .toLocaleDateString("es-CL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}
