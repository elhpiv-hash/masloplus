import "server-only";
import { manualGallery } from "@/content/gallery";
import { sanitizeText } from "@/lib/sanitize";
import type { GalleryItem } from "@/types/gallery";

/**
 * Возвращает элементы галереи для страницы (серверно).
 * Приоритет — авто-подтяжка из VK (если задан токен в .env), иначе ручной список.
 * Любые внешние подписи санитизируются. Токены VK клиенту НЕ отдаются (только серверно).
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const fromVk = await fetchVkGallery().catch(() => []);
  const items = fromVk.length > 0 ? fromVk : manualGallery;
  return items.map(sanitizeItem);
}

// --- Санитизация подписей у любого источника ---------------------------------

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

// --- VK ----------------------------------------------------------------------

type VkSize = { url: string; width: number; height: number };
type VkPhoto = { id: number; sizes?: VkSize[] };
type VkAttachment = { type: string; photo?: VkPhoto };
type VkPost = {
  id: number;
  owner_id: number;
  date?: number;
  text?: string;
  attachments?: VkAttachment[];
};
type VkResponse = { response?: { items?: VkPost[] } };

/**
 * Тянет последние фото со стены сообщества VK через wall.get.
 * Требует VK_SERVICE_TOKEN и VK_COMMUNITY_ID в .env (только серверно). Иначе — [].
 */
async function fetchVkGallery(): Promise<GalleryItem[]> {
  const token = process.env.VK_SERVICE_TOKEN;
  const community = process.env.VK_COMMUNITY_ID;
  if (!token || !community) return [];

  const url = new URL("https://api.vk.com/method/wall.get");
  url.searchParams.set("owner_id", `-${community.replace(/^-/, "")}`);
  url.searchParams.set("count", "24");
  url.searchParams.set("access_token", token);
  url.searchParams.set("v", "5.199");

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) return [];

  const data = (await response.json()) as VkResponse;
  const posts = data.response?.items ?? [];
  const items: GalleryItem[] = [];

  for (const post of posts) {
    for (const attachment of post.attachments ?? []) {
      if (attachment.type !== "photo" || !attachment.photo?.sizes?.length) continue;
      const largest = attachment.photo.sizes[attachment.photo.sizes.length - 1];
      items.push({
        id: `vk-photo-${attachment.photo.id}`,
        type: "photo",
        src: largest.url,
        width: largest.width,
        height: largest.height,
        alt: sanitizeText(post.text) || "Работа автосервиса «Масло Плюс»",
        caption: sanitizeText(post.text) || undefined,
        publishedAt: post.date ? new Date(post.date * 1000).toISOString() : undefined,
        sourceUrl: `https://vk.com/wall${post.owner_id}_${post.id}`,
      });
    }
  }

  return items;
}
