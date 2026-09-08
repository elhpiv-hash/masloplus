import type { GalleryItem } from "@/types/gallery";

/**
 * Галерея — РУЧНОЙ список (владелец наполняет сам, без автоподтяжки из соцсетей).
 *
 * Как добавить работу: положите фото в public/gallery/ и добавьте объект ниже.
 * Видео (только VK Видео / RuTube):
 *   { id, type: "video", title, video: { provider: "rutube", id: "RUTUBE_ID" } }
 *   { id, type: "video", title, video: { provider: "vk", ownerId: "-123", id: "456" } }
 */
export const manualGallery: GalleryItem[] = [
  {
    id: "promo-oil",
    type: "photo",
    src: "/gallery/promo-oil.jpg",
    alt: "Только оригинальные масла — сеть станций техобслуживания Масло Плюс",
    caption: "Только оригинальные масла",
  },
  {
    id: "promo-express",
    type: "photo",
    src: "/gallery/promo-express.jpg",
    alt: "Экспресс-замена масла с сохранением гарантии на автомобиль — Масло Плюс",
    caption: "Экспресс-замена масла с сохранением гарантии",
  },
  {
    id: "promo-diagnostics",
    type: "photo",
    src: "/gallery/promo-diagnostics.jpg",
    alt: "Экспресс-диагностика автомобиля на вибростенде — Масло Плюс",
    caption: "Экспресс-диагностика авто на вибростенде",
  },
];
