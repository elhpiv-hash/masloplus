import "server-only";
import { manualGallery } from "@/content/gallery";
import { sanitizeText } from "@/lib/sanitize";
import type { GalleryItem } from "@/types/gallery";

/**
 * Возвращает элементы галереи. Источник — ручной список content/gallery.ts
 * (владелец наполняет сам, без автоподтяжки из соцсетей).
 * Подписи на всякий случай санитизируются перед выводом.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return manualGallery.map(sanitizeItem);
}

function sanitizeItem(item: GalleryItem): GalleryItem {
  if (item.type === "photo") {
    return {
      ...item,
      alt: sanitizeText(item.alt) || "Работа автосервиса «Масло Плюс»",
      caption: item.caption ? sanitizeText(item.caption) : undefined,
    };
  }
  return {
    ...item,
    title: sanitizeText(item.title) || "Видео автосервиса «Масло Плюс»",
    caption: item.caption ? sanitizeText(item.caption) : undefined,
  };
}
