import type { GalleryVideoSource } from "@/types/gallery";

/**
 * Белый список доменов для видео-embed.
 *  - VK Видео / RuTube — ручные видео галереи.
 *  - t.me — официальный embed постов Telegram (видео + подпись из канала).
 * YouTube не используем.
 */
export const ALLOWED_EMBED_HOSTS = ["vk.com", "vkvideo.ru", "rutube.ru", "t.me"] as const;

/** Строит безопасный URL для iframe из провайдера/идентификаторов (домен — по построению из белого списка). */
export function getEmbedUrl(video: GalleryVideoSource): string {
  if (video.provider === "rutube") {
    return `https://rutube.ru/play/embed/${encodeURIComponent(video.id)}`;
  }
  if (video.provider === "telegram") {
    // Официальный embed поста: видеоплеер + подпись. dark=1 — под тёмный лайтбокс.
    const channel = encodeURIComponent(video.channel);
    const id = encodeURIComponent(video.id);
    return `https://t.me/${channel}/${id}?embed=1&dark=1`;
  }
  const params = new URLSearchParams({ oid: video.ownerId, id: video.id, hd: "2" });
  if (video.hash) params.set("hash", video.hash);
  return `https://vk.com/video_ext.php?${params.toString()}`;
}

/**
 * Проверяет, что произвольный URL (например, пришедший из внешнего источника)
 * ведёт на разрешённый домен по https. Используется как страховка перед рендером iframe.
 */
export function isAllowedEmbedUrl(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  return ALLOWED_EMBED_HOSTS.some(
    (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
  );
}
