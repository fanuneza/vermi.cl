export const SITE_NAME = "vermi.cl";

export const HOME_METADATA = {
  title: "Compostaje doméstico con lombrices californianas",
  description:
    "Aprende vermicompostaje doméstico en Chile. Guías científicas y prácticas para reducir tus residuos orgánicos con lombrices californianas.",
} as const;

export function formatPageTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}
