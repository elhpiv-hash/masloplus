/** Пункты навигации сайта — единый источник для Header, мобильного меню и Footer. */

export type NavItem = {
  href: string;
  label: string;
};

export const mainNav: readonly NavItem[] = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/nabory", label: "Наборы ТО" },
  { href: "/galereya", label: "Галерея" },
  { href: "/kontakty", label: "Контакты" },
];

/** Юридические страницы (создадим в Промте 9). */
export const legalNav: readonly NavItem[] = [
  { href: "/policy", label: "Политика обработки ПД" },
  { href: "/soglashenie", label: "Пользовательское соглашение" },
];

/** Куда ведёт основной CTA «Записаться» — к блоку онлайн-записи (SONLINE) на /kontakty. */
export const bookingHref = "/kontakty#zapis";
