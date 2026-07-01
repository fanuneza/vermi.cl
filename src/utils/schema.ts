import {
  buildArticle,
  buildBreadcrumbList,
  buildImageObject,
  buildPiece,
  buildWebPage,
  buildWebSite,
  makeIds,
  type ArticleInput,
  type GraphEntity,
  type WebPageInput,
  type WebSiteInput,
} from "@jdevalk/seo-graph-core";
import type { Blog, Organization, Person, ProfilePage } from "schema-dts";
import { getBlogTagLabel } from "./blog-tags";

export const SITE_URL = "https://vermi.cl";

export const ids = makeIds({
  siteUrl: SITE_URL,
  personUrl: `${SITE_URL}/nosotros/`,
});

const organizationId = ids.organization("vermi-cl");
const camilaId = `${SITE_URL}/nosotros/#camila-verdejo`;
const fabianId = `${SITE_URL}/nosotros/#fabian-nunez`;
const blogId = `${SITE_URL}/blog/#publication`;

type PageType =
  "website" | "webpage" | "blogPost" | "blogListing" | "about" | "page";

interface SchemaOptions {
  pageType: PageType;
  url: string;
  title: string;
  description: string;
  publishDate?: Date;
  authorName?: string;
  featureImageUrl?: string;
  category?: string;
  tags?: readonly string[];
}

function createSiteWideEntities(): GraphEntity[] {
  const website = buildWebSite(
    {
      url: `${SITE_URL}/`,
      name: "vermi.cl",
      alternateName: ["vermi.cl"],
      description:
        "Aprende vermicompostaje doméstico en Chile con guías científicas, prácticas y adaptadas a hogares urbanos.",
      publisher: { "@id": organizationId },
      inLanguage: "es-CL",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        } as unknown as Record<string, unknown>,
      ],
    } as unknown as WebSiteInput,
    ids,
  ) as GraphEntity;

  const organization = buildPiece<Organization>({
    "@type": "Organization",
    "@id": organizationId,
    name: "vermi.cl",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.svg`,
    },
    description:
      "Portal educativo chileno sobre lombricultura, vermicompostaje y salud del suelo.",
  }) as GraphEntity;

  const camila = buildPiece<Person>({
    "@type": "Person",
    "@id": camilaId,
    name: "Camila Verdejo",
    url: `${SITE_URL}/nosotros/`,
    knowsAbout: [
      "Lombricultura",
      "Vermicompostaje doméstico",
      "Biología del suelo",
    ],
  }) as GraphEntity;

  const fabian = buildPiece<Person>({
    "@type": "Person",
    "@id": fabianId,
    name: "Fabián Núñez",
    url: `${SITE_URL}/nosotros/`,
    knowsAbout: [
      "Lombricultura",
      "Compostaje urbano",
      "Rendimiento web",
      "SEO técnico",
    ],
  }) as GraphEntity;

  const blog = buildPiece<Blog>({
    "@type": "Blog",
    "@id": blogId,
    name: "Guías vermi.cl",
    description:
      "Archivo editorial con manuales, guías de alimentación, resolución de problemas y cosecha de humus.",
    url: `${SITE_URL}/blog/`,
    publisher: { "@id": organizationId },
    inLanguage: "es-CL",
  }) as GraphEntity;

  return [website, organization, camila, fabian, blog];
}

function resolveAuthorId(authorName?: string) {
  return authorName?.toLowerCase().includes("fabi") ? fabianId : camilaId;
}

function normalizeUrl(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}

export function buildSchemaGraph(options: SchemaOptions) {
  const url = normalizeUrl(options.url);
  const pieces: GraphEntity[] = [...createSiteWideEntities()];

  if (options.pageType === "website") {
    return {
      "@context": "https://schema.org" as const,
      "@graph": pieces,
    };
  }

  const webPageInput: WebPageInput = {
    url,
    name: options.title,
    description: options.description,
    isPartOf: { "@id": ids.website },
    breadcrumb: { "@id": ids.breadcrumb(url) },
  };

  if (options.publishDate) {
    webPageInput.datePublished = options.publishDate;
  }

  if (options.featureImageUrl) {
    webPageInput.primaryImage = { "@id": ids.primaryImage(url) };
  }

  if (options.pageType === "about") {
    pieces.push(
      buildWebPage(webPageInput, ids, "ProfilePage") as GraphEntity,
      buildPiece<ProfilePage>({
        "@type": "ProfilePage",
        "@id": ids.webPage(url),
        mainEntity: { "@id": camilaId },
      }) as GraphEntity,
      buildBreadcrumbList(
        {
          url,
          items: [
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: options.title, url },
          ],
        },
        ids,
      ) as GraphEntity,
    );

    return {
      "@context": "https://schema.org" as const,
      "@graph": pieces,
    };
  }

  if (options.pageType === "blogListing") {
    pieces.push(
      buildWebPage(webPageInput, ids, "CollectionPage") as GraphEntity,
      buildBreadcrumbList(
        {
          url,
          items: [
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: options.title, url },
          ],
        },
        ids,
      ) as GraphEntity,
    );

    return {
      "@context": "https://schema.org" as const,
      "@graph": pieces,
    };
  }

  pieces.push(buildWebPage(webPageInput, ids) as GraphEntity);

  if (options.pageType === "blogPost") {
    const tags = (options.tags ?? []).map((tag) => getBlogTagLabel(tag));
    const articleInput: ArticleInput = {
      url,
      isPartOf: { "@id": ids.webPage(url) },
      headline: options.title,
      description: options.description,
      datePublished: options.publishDate || new Date(),
      author: { "@id": resolveAuthorId(options.authorName) },
      publisher: { "@id": organizationId },
    };

    if (options.category) {
      articleInput.articleSection = options.category;
    }

    if (options.featureImageUrl) {
      articleInput.image = { "@id": ids.primaryImage(url) };
    }

    const article = buildArticle(
      articleInput,
      ids,
      "BlogPosting",
    ) as GraphEntity;
    if (tags.length > 0) {
      (article as Record<string, unknown>).keywords = tags;
      (article as Record<string, unknown>).about = tags.map((tag) => ({
        "@type": "Thing",
        name: tag,
      }));
    }

    pieces.push(
      article,
      buildBreadcrumbList(
        {
          url,
          items: [
            { name: "Inicio", url: `${SITE_URL}/` },
            { name: "Guías", url: `${SITE_URL}/blog/` },
            { name: options.title, url },
          ],
        },
        ids,
      ) as GraphEntity,
    );

    if (options.featureImageUrl) {
      pieces.push(
        buildImageObject(
          {
            pageUrl: url,
            url: options.featureImageUrl.startsWith("http")
              ? options.featureImageUrl
              : `${SITE_URL}${options.featureImageUrl}`,
            width: 1200,
            height: 675,
            inLanguage: "es-CL",
          },
          ids,
        ) as GraphEntity,
      );
    }
  }

  return {
    "@context": "https://schema.org" as const,
    "@graph": pieces,
  };
}
