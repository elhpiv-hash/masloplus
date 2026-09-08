import type { GalleryItem } from "@/types/gallery";

/**
 * Ручной список галереи — запасной вариант, когда авто-подтяжка из VK/Telegram недоступна.
 * Приоритет у авто-подтяжки: если задан VK-токен (см. .env), берётся лента VK, иначе — этот список.
 *
 * Как добавить работу вручную: положите фото в public/gallery/ и добавьте объект ниже.
 * 🔴 Сейчас здесь ПРИМЕРЫ-заглушки — заменить реальными фото или включить автоподтяжку.
 *
 * Видео (только VK Видео / RuTube) добавляется так (пример):
 *   { id: "v1", type: "video", title: "Замена масла — видео",
 *     video: { provider: "rutube", id: "RUTUBE_VIDEO_ID" } }
 *   { id: "v2", type: "video", title: "ТО двигателя",
 *     video: { provider: "vk", ownerId: "-123456", id: "456239021" } }
 */
export const manualGallery: GalleryItem[] = [
  {
    id: "sample-1",
    type: "photo",
    src: "/gallery/sample-1.svg",
    alt: "Замена масла в двигателе — Масло Плюс",
    caption: "Замена масла и масляного фильтра",
  },
  {
    id: "sample-2",
    type: "photo",
    src: "/gallery/sample-2.svg",
    alt: "Аппаратная замена технической жидкости — Масло Плюс",
    caption: "Аппаратная замена под давлением",
  },
  {
    id: "sample-3",
    type: "photo",
    src: "/gallery/sample-3.svg",
    alt: "Обслуживание автомобиля — Масло Плюс",
    caption: "Обслуживание и диагностика",
  },
];
