import type { Metadata } from "next";

export const SITE_NAME = "Масло Плюс";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const DEFAULT_TITLE = "Масло Плюс — замена масла и ТО в Чебоксарах";

/**
 * Единый билдер метаданных страницы: канонический URL, Open Graph и Twitter.
 * OG-картинку добавляет файловая конвенция app/opengraph-image — здесь её не задаём.
 */
export function pageMetadata(opts: {
  title?: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const { title, description, path, noindex } = opts;
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
