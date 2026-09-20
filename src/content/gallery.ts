import type { GalleryItem } from "@/types/gallery";

/**
 * Галерея — РУЧНОЙ список (владелец наполняет сам, без автоподтяжки из соцсетей).
 *
 * Как добавить работу: положите фото в public/gallery/ и добавьте объект ниже.
 * Видео (только VK Видео / RuTube):
 *   { id, type: "video", title, video: { provider: "rutube", id: "RUTUBE_ID" } }
 *   { id, type: "video", title, video: { provider: "vk", ownerId: "-123", id: "456" } }
 */
export const manualGallery: GalleryItem[] = [];
