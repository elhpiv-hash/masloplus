/** Типы каталога услуг. Полный список услуг с ценами добавим в Промте 6. */

export type ServiceCategoryKey = "engine" | "transmission" | "filters" | "extra";

export type ServiceCategory = {
  slug: ServiceCategoryKey;
  title: string;
  /** Короткое описание для обзорной карточки на главной. */
  description: string;
};
