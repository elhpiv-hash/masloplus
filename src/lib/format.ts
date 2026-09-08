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

/**
 * Форматирование цены-варианта услуги:
 *  - null      → «по запросу»;
 *  - 0         → «бесплатно»;
 *  - number    → «N ₽»;
 *  - { from }  → «от N ₽».
 */
export function formatMoney(value: number | { from: number } | null): string {
  if (value === null) return "по запросу";
  if (typeof value === "number") return value === 0 ? "бесплатно" : formatPrice(value);
  return `от${NBSP}${formatPrice(value.from)}`;
}
