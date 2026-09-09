/** Типы каталога услуг и цен. */

export type ServiceCategoryKey = "engine" | "transmission" | "filters" | "extra";

export type ServiceCategory = {
  slug: ServiceCategoryKey;
  title: string;
  /** Короткое описание для обзорной карточки на главной. */
  description: string;
  /** Фото категории для карточки обзора (путь в public/, напр. "/services/engine.jpg"). */
  image?: string;
};

/** Материалы: сети (покупаем у нас) или клиента (привозит свои). */
export type Materials = "network" | "client";

/**
 * Цена операции:
 *  - number       — точная цена (0 = «бесплатно»);
 *  - { from }     — «от N ₽»;
 *  - null         — «по запросу» (не подтверждена / считается индивидуально).
 */
export type Money = number | { from: number } | null;

export type ServicePrice = {
  /** Цена при материалах сети. */
  network: Money;
  /** Цена при материалах клиента. */
  client: Money;
};

export type Service = {
  slug: string;
  categorySlug: ServiceCategoryKey;
  title: string;
  /** Уточнение под названием (напр. тип КПП, «под давлением»). */
  note?: string;
  price: ServicePrice;
  /** Участвует ли в калькуляторе (по умолчанию true). */
  inCalculator?: boolean;
};
