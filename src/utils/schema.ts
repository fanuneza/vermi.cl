import {
  makeIds,
  assembleGraph,
  buildWebSite,
  buildPiece,
  buildWebPage,
  buildArticle,
  buildBreadcrumbList,
  buildImageObject,
  buildSiteNavigationElement,
} from "@jdevalk/seo-graph-core";
import type { Person, Organization, Blog } from "schema-dts";

const SITE_URL = "https://vermi.cl";

export const ids = makeIds({
  siteUrl: SITE_URL,
  personUrl: `${SITE_URL}/nosotros/`,
});

// Organization identity (vermi.cl)
const orgId = ids.organization("vermi");
const organization = buildPiece<Organization>({
  "@type": "Organization",
  "@id": orgId,
  name: "vermi.cl",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/favicon.svg`,
    caption: "Logo de vermi.cl",
  },
  slogan: "Lombricultura y vermicompostaje doméstico en Chile",
  description:
    "Portal educativo sobre lombricultura, vermicompostaje y cuidado orgánico del suelo.",
});

// Person - Camila Verdejo
const camilaId = `${SITE_URL}/nosotros/#camila`;
const camila = buildPiece<Person>({
  "@type": "Person",
  "@id": camilaId,
  name: "Camila Verdejo",
  url: `${SITE_URL}/nosotros/`,
  description:
    "Especialista en vermicompostaje y educación ambiental en Chile.",
  knowsAbout: [
    "Lombricultura",
    "Compostaje doméstico",
    "Biología del suelo",
    "Sustentabilidad",
  ],
});

// Person - Fabián Núñez
const fabianId = `${SITE_URL}/nosotros/#fabian`;
const fabian = buildPiece<Person>({
  "@type": "Person",
  "@id": fabianId,
  name: "Fabián Núñez",
  url: `${SITE_URL}/nosotros/`,
  description:
    "Desarrollador y entusiasta del vermicompostaje doméstico en Chile.",
  knowsAbout: ["Lombricultura", "Reciclaje orgánico", "Web Performance"],
});

// Main Site Navigation
const navigation = buildSiteNavigationElement(
  {
    name: "Menú de navegación principal",
    isPartOf: { "@id": ids.website },
    items: [
      { name: "Inicio", url: `${SITE_URL}/` },
      { name: "Guías", url: `${SITE_URL}/blog/` },
      { name: "Nosotros", url: `${SITE_URL}/nosotros/` },
    ],
  },
  ids,
);

// Blog entity representing the blog section/publication
const blogId = `${SITE_URL}/blog/#blog`;
const blogSection = buildPiece<Blog>({
  "@type": "Blog",
  "@id": blogId,
  name: "Guías vermi.cl",
  description:
    "Aprende lombricultura paso a paso: alimentación, control de plagas y cosecha de humus.",
  url: `${SITE_URL}/blog/`,
  publisher: { "@id": orgId },
  inLanguage: "es-CL",
});

// Site-wide entities included on every page
function siteWideEntities(): any[] {
  return [
    buildWebSite(
      {
        url: `${SITE_URL}/`,
        name: "vermi.cl",
        description:
          "Aprende vermicompostaje doméstico en Chile. Guías científicas y prácticas para reducir tus residuos orgánicos.",
        publisher: { "@id": orgId },
        inLanguage: "es-CL",
        hasPart: { "@id": ids.navigation },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/api/alimentos.json?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        } as any,
      },
      ids,
    ),
    organization,
    camila,
    fabian,
    navigation,
    blogSection,
  ];
}

export function buildSchemaGraph(opts: {
  pageType: "blogPost" | "blogListing" | "about" | "page";
  url: string;
  title: string;
  description: string;
  publishDate?: Date;
  authorName?: string;
  featureImageUrl?: string;
  category?: string;
}) {
  const pieces: any[] = [...siteWideEntities()];
  const {
    url,
    title,
    description,
    publishDate,
    authorName,
    featureImageUrl,
    category,
  } = opts;

  // Resolve author ID
  let authorId = camilaId;
  if (authorName && authorName.toLowerCase().includes("fabian")) {
    authorId = fabianId;
  }

  switch (opts.pageType) {
    case "blogPost":
      pieces.push(
        buildWebPage(
          {
            url,
            name: title,
            isPartOf: { "@id": ids.website },
            breadcrumb: { "@id": ids.breadcrumb(url) },
            datePublished: publishDate,
            primaryImage: featureImageUrl
              ? { "@id": ids.primaryImage(url) }
              : undefined,
            inLanguage: "es-CL",
          },
          ids,
        ),
        buildArticle(
          {
            url,
            isPartOf: [{ "@id": ids.webPage(url) }, { "@id": blogId }] as any,
            author: { "@id": authorId },
            publisher: { "@id": orgId },
            headline: title,
            description,
            datePublished: publishDate || new Date(),
            image: featureImageUrl
              ? { "@id": ids.primaryImage(url) }
              : undefined,
            articleSection: category,
            inLanguage: "es-CL",
          },
          ids,
          "BlogPosting",
        ),
        buildBreadcrumbList(
          {
            url,
            items: [
              { name: "Inicio", url: `${SITE_URL}/` },
              { name: "Guías", url: `${SITE_URL}/blog/` },
              { name: title, url },
            ],
          },
          ids,
        ),
      );
      if (featureImageUrl) {
        pieces.push(
          buildImageObject(
            {
              pageUrl: url,
              url: featureImageUrl.startsWith("http")
                ? featureImageUrl
                : `${SITE_URL}${featureImageUrl}`,
              width: 1200,
              height: 675,
              inLanguage: "es-CL",
            },
            ids,
          ),
        );
      }
      break;

    case "blogListing":
      pieces.push(
        buildWebPage(
          {
            url,
            name: title,
            isPartOf: { "@id": ids.website },
            breadcrumb: { "@id": ids.breadcrumb(url) },
            about: { "@id": blogId },
            inLanguage: "es-CL",
          },
          ids,
          "CollectionPage",
        ),
        buildBreadcrumbList(
          {
            url,
            items: [
              { name: "Inicio", url: `${SITE_URL}/` },
              { name: "Guías", url },
            ],
          },
          ids,
        ),
      );
      break;

    case "about":
      pieces.push(
        buildWebPage(
          {
            url,
            name: title,
            isPartOf: { "@id": ids.website },
            breadcrumb: { "@id": ids.breadcrumb(url) },
            about: [{ "@id": camilaId }, { "@id": fabianId }] as any,
            inLanguage: "es-CL",
          },
          ids,
          "ProfilePage",
        ),
        buildBreadcrumbList(
          {
            url,
            items: [
              { name: "Inicio", url: `${SITE_URL}/` },
              { name: "Nosotros", url },
            ],
          },
          ids,
        ),
      );
      break;

    case "page":
    default:
      pieces.push(
        buildWebPage(
          {
            url,
            name: title,
            isPartOf: { "@id": ids.website },
            breadcrumb: { "@id": ids.breadcrumb(url) },
            inLanguage: "es-CL",
          },
          ids,
        ),
        buildBreadcrumbList(
          {
            url,
            items: [
              { name: "Inicio", url: `${SITE_URL}/` },
              { name: title, url },
            ],
          },
          ids,
        ),
      );
      break;
  }

  return assembleGraph(pieces as any[], { warnOnDanglingReferences: true });
}
