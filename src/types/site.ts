/** Типы для единого источника NAP (Name-Address-Phone) и данных организации. */

export type Phone = {
  /** Как показываем пользователю: "+7 (8352) 24-24-11" */
  display: string;
  /** Значение для tel:-ссылки в формате E.164: "+78352242411" */
  tel: string;
};

export type WorkingHours = {
  /** Будни, напр. "Пн–Пт 9:00–19:00" */
  weekdays: string;
  /** Выходные, напр. "Сб–Вс 9:00–17:00" */
  weekend: string;
};

export type GeoPoint = {
  lat: number;
  lng: number;
};

export type LocationMaps = {
  /** Ссылка на карточку в Яндекс.Картах */
  yandex?: string;
  /** Ссылка на карточку в 2ГИС */
  gis2?: string;
};

export type Location = {
  /** Стабильный идентификатор точки (kebab-case) */
  slug: string;
  /** Человекочитаемое название точки */
  title: string;
  /** Улица и дом */
  addressStreet: string;
  city: string;
  phones: Phone[];
  hours: WorkingHours;
  /** Координаты для карты (приблизительные — уточнить) */
  geo?: GeoPoint;
  maps: LocationMaps;
  /**
   * id организации в Яндекс.Картах для официального виджета отзывов
   * (https://yandex.ru/maps-reviews-widget/<id>). Отзывы подтягиваются и
   * обновляются на стороне Яндекса — ничего не парсим и не храним у себя.
   */
  reviewsWidgetId?: string;
};

export type Socials = {
  vk: string;
  telegram: string;
  /** Instagram (принадлежит Meta, запрещённой в РФ) — по прямой просьбе владельца. */
  instagram?: string;
};

/** Ссылки на мобильное приложение сети (для будущей секции-плашки на главной). */
export type AppLinks = {
  appStore?: string;
  googlePlay?: string;
};

export type Organization = {
  /** Юридическое наименование (для JSON-LD и подвала) — уточнить у владельца */
  legalName?: string;
  /** Бренд/торговое название */
  brand: string;
  inn?: string;
  ogrn?: string;
  email?: string;
};

export type SiteConfig = {
  brand: string;
  org: Organization;
  locations: Location[];
  socials: Socials;
  /** Мобильное приложение (App Store / Google Play). */
  apps?: AppLinks;
};
