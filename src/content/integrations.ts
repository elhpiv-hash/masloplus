/**
 * Внешние виджеты (Яндекс). Значения появятся после получения id/ключей у владельца (🔴).
 * Пока не заданы — компоненты показывают аккуратный фолбэк, а embed не грузится.
 * Реальное подключение + расширение CSP под Яндекс — в Промтах 9–10.
 */

/** Ссылка на iframe-виджет отзывов Яндекс.Карт (map-widget). undefined → фолбэк. */
export const yandexReviewsWidgetSrc: string | undefined = undefined;

/**
 * Собирает ссылку на официальный виджет отзывов Яндекс.Карт по id организации.
 * Отзывы рендерит и обновляет сам Яндекс — мы ничего не парсим и не храним.
 */
export function yandexReviewsWidgetSrcById(orgId: string): string {
  return `https://yandex.ru/maps-reviews-widget/${orgId}?comments`;
}

/** Ссылка на iframe-виджет карты Яндекс со всеми точками. undefined → фолбэк. */
export const yandexMapWidgetSrc: string | undefined = undefined;

/**
 * Онлайн-запись через SONLINE — сервис, которым сеть пользуется для приёма заявок
 * (тот же виджет, что и на старом сайте). Встраивается iframe'ом на /kontakty;
 * домен widget.sonline.su добавлен в белый список CSP (frame-src).
 */
export const sonlineBookingUrl =
  "https://widget.sonline.su/ru/map/?groupid=556649&placeid=583132206";
