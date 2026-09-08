import type { Materials, Money, Service } from "@/types/services";

export type CalcResult = {
  /** Сколько услуг выбрано. */
  count: number;
  /** Сумма известных числовых цен (для «от N» берём N). */
  total: number;
  /** Есть ли среди выбранного цена «от» → итог показываем как «от …». */
  isFrom: boolean;
  /** Есть ли среди выбранного услуга «по запросу» (цена не считается автоматически). */
  hasByRequest: boolean;
};

/** Разбор одного значения цены в сумму/флаги. Чистая функция. */
export function moneyValue(money: Money): { amount: number; isFrom: boolean; known: boolean } {
  if (money === null) return { amount: 0, isFrom: false, known: false };
  if (typeof money === "number") return { amount: money, isFrom: false, known: true };
  return { amount: money.from, isFrom: true, known: true };
}

/**
 * Считает итог по выбранным услугам и выбранному типу материалов.
 * Чистая функция без побочных эффектов — покрыта юнит-тестами.
 */
export function calculatePrice(selected: Service[], materials: Materials): CalcResult {
  let total = 0;
  let isFrom = false;
  let hasByRequest = false;

  for (const service of selected) {
    const money = materials === "network" ? service.price.network : service.price.client;
    const { amount, isFrom: from, known } = moneyValue(money);
    if (!known) {
      hasByRequest = true;
      continue;
    }
    total += amount;
    if (from) isFrom = true;
  }

  return { count: selected.length, total, isFrom, hasByRequest };
}
