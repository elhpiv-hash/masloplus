import "server-only";
import { manualGallery } from "@/content/gallery";
import { telegramGallery } from "@/content/telegram-gallery.generated";
import { sanitizeText } from "@/lib/sanitize";
import type { GalleryItem } from "@/types/gallery";

/**
 * Возвращает элементы галереи. Два источника:
 *  - telegramGallery — видео из канала t.me/masloplus, генерируется автоматически
 *    (scripts/fetch-telegram.mjs по расписанию, свежие сверху);
 *  - manualGallery — ручные фото, владелец добавляет сам.
 * Видео Telegram идут первыми (самые новые работы), затем ручные фото.
 * Подписи санитизируются перед выводом.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return [...telegramGallery, ...manualGallery].map(sanitizeItem);
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
