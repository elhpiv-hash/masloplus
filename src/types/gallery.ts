/** Типы галереи работ и видео. */

export type GalleryVideoSource =
  | { provider: "rutube"; id: string }
  | { provider: "vk"; ownerId: string; id: string; hash?: string };

export type GalleryPhoto = {
  id: string;
  type: "photo";
  /** Локальный (/gallery/...) или удалённый (CDN VK) URL картинки. */
  src: string;
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
  /** ISO-дата публикации (для сортировки/подписи). */
  publishedAt?: string;
  /** Ссылка на исходный пост (VK/Telegram). */
  sourceUrl?: string;
};

export type GalleryVideo = {
  id: string;
  type: "video";
  video: GalleryVideoSource;
  /** Превью видео (опционально). */
  thumb?: string;
  title: string;
  caption?: string;
  publishedAt?: string;
  sourceUrl?: string;
};

export type GalleryItem = GalleryPhoto | GalleryVideo;
