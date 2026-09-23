import { bookingHref } from "./navigation";
import { sonlineBookingUrl } from "./integrations";

/** Контент главной страницы. Не хардкодим в разметке — правим здесь. */

export const hero = {
  eyebrow: "Автосервис в Чебоксарах · 3 точки",
  title: "Замена масла и ТО — быстро, прозрачно, с гарантией",
  subtitle:
    "Экспресс-замена масла в двигателе и трансмиссии, готовые наборы ТО под ваш автомобиль. Честные цены и гарантия на работы и материалы сети.",
  primaryCta: { label: "Записаться", href: bookingHref },
  secondaryCta: { label: "Рассчитать стоимость", href: "/uslugi#kalkulyator" },
} as const;

/** Прямоугольник на баннере в процентах от его ширины/высоты. */
export type BannerArea = { left: number; top: number; width: number; height: number };

export type HeroSlide = {
  /** Баннер в public/ (1280×548). */
  src: string;
  alt: string;
  /**
   * Кнопка «Записаться», нарисованная на самом баннере: кликабельна только эта
   * зона (а не весь слайд). Нет кнопки на картинке — нет поля, слайд не кликается.
   * radius — скругление нарисованной кнопки в CSS-формате «гориз.% / верт.%»,
   * чтобы подсветка при наведении повторяла её форму на любой ширине экрана.
   */
  cta?: { href: string; label: string; area: BannerArea; radius?: string };
};

/**
 * Слайды героя-карусели (фирменные баннеры из ФОТОЛОГО, уже лежат в public/gallery).
 * Координаты кнопки сняты с исходника 1280×548 по пикселям: кнопка 175×44 px,
 * скругление ~3 px (px / 1280 и px / 548 → %). Если баннер заменят и кнопка
 * сдвинется — поправить area. Добавить баннер = добавить объект.
 * Только без бонусов/ЛК (вне scope сайта).
 */
export const heroSlides: HeroSlide[] = [
  {
    src: "/gallery/promo-oil.jpg",
    alt: "Только оригинальные масла — сеть станций техобслуживания «Масло Плюс»",
    cta: {
      href: sonlineBookingUrl,
      label: "Записаться онлайн",
      area: { left: 82.97, top: 84.12, width: 13.67, height: 8.03 },
      radius: "1.7% / 6.8%",
    },
  },
  {
    src: "/gallery/promo-express.jpg",
    alt: "Экспресс-замена масла с сохранением гарантии на автомобиль",
    cta: {
      href: sonlineBookingUrl,
      label: "Записаться онлайн",
      area: { left: 2.66, top: 84.12, width: 13.67, height: 8.03 },
      radius: "1.7% / 6.8%",
    },
  },
  {
    src: "/gallery/promo-diagnostics.jpg",
    alt: "Новая услуга: экспресс-диагностика авто на вибростенде",
  },
];

export type TrustBadge = {
  value: string;
  label: string;
  /** Короткая подпись для компактной строки на мобиле. */
  short: string;
};

/** Полоса доверия (как у референса, но честно под наш масштаб). */
export const trustBadges: TrustBadge[] = [
  { value: "3", label: "точки в Чебоксарах", short: "точки" },
  { value: "15 мин", label: "на замену масла в ДВС", short: "на замену" },
  { value: "1 год", label: "гарантия на работы и материалы сети", short: "гарантия" },
  { value: "200+", label: "видов масел в наличии", short: "видов масел" },
  { value: "Оригинал", label: "масла и запчасти от ведущих брендов", short: "бренды" },
];

export type PackTeaser = {
  slug: string;
  brand: string;
  model: string;
  engine: string;
  /** Известная цена «от» (руб.). Где цена не подтверждена — не указываем. */
  fromPrice?: number;
  best?: boolean;
};

/**
 * Превью популярных наборов ТО для главной. Ссылается на /nabory.
 * Полные наборы с тарифами/составом/поиском — в Промте 7 (content/packs).
 * Цены: VW Polo — со старого сайта; остальные помечены как «уточняется» (🔴 у владельца).
 */
export const packsPreview: PackTeaser[] = [
  {
    slug: "vw-polo-1-6-110",
    brand: "Volkswagen",
    model: "Polo",
    engine: "1.6 110 л.с.",
    fromPrice: 4650,
    best: true,
  },
  { slug: "kia-rio", brand: "KIA", model: "Rio", engine: "1.4 / 1.6", fromPrice: 3800, best: true },
  {
    slug: "lada-8kl",
    brand: "Lada",
    model: "8 кл.",
    engine: "Гранта, Калина, Приора",
    fromPrice: 2900,
  },
];

export const oilsBlock = {
  eyebrow: "Ассортимент",
  title: "Более 200 видов масел в наличии",
  text: "Подберём масло под ваш автомобиль и стиль эксплуатации — от бюджетных до премиальных линеек ведущих производителей. Оригинальная продукция и честные условия.",
} as const;

export const galleryPreview = {
  eyebrow: "Наши работы",
  title: "Галерея работ и видео",
  text: "Свежие работы и видео сервиса. Обновляется из нашего Telegram.",
  href: "/galereya",
} as const;

export const finalCta = {
  title: "Записаться на замену масла или ТО",
  text: "Выберите удобную точку в Чебоксарах — запишем на удобное время. Обычно замена занимает от 15 минут.",
  primary: { label: "Записаться", href: bookingHref },
} as const;
