/** Неразрывный пробел (U+00A0) — чтобы символ ₽ не переносился на новую строку. */
const NBSP = String.fromCharCode(0x00a0);

/**
 * Форматирование цены в рублях по правилам русской локали.
 * Разряды разделяются неразрывным пробелом (его подставляет Intl для ru-RU),
 * затем неразрывный пробел и символ ₽.
 * Пример: 1450 → "1 450 ₽".
 */
export function formatPrice(value: number): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(Math.round(value));
  return `${formatted}${NBSP}₽`;
}
