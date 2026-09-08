import { describe, expect, it } from "vitest";
import type { Service } from "@/types/services";
import { calculatePrice, moneyValue } from "./calculatePrice";

const svc = (
  slug: string,
  network: Service["price"]["network"],
  client: Service["price"]["client"],
): Service => ({
  slug,
  categorySlug: "engine",
  title: slug,
  price: { network, client },
});

describe("moneyValue", () => {
  it("число трактуется как известная точная сумма", () => {
    expect(moneyValue(500)).toEqual({ amount: 500, isFrom: false, known: true });
  });
  it("ноль — известная сумма (бесплатно)", () => {
    expect(moneyValue(0)).toEqual({ amount: 0, isFrom: false, known: true });
  });
  it("{from} — известная сумма со флагом «от»", () => {
    expect(moneyValue({ from: 800 })).toEqual({ amount: 800, isFrom: true, known: true });
  });
  it("null — неизвестно (по запросу)", () => {
    expect(moneyValue(null)).toEqual({ amount: 0, isFrom: false, known: false });
  });
});

describe("calculatePrice", () => {
  it("пустой выбор даёт нулевой итог без флагов", () => {
    expect(calculatePrice([], "network")).toEqual({
      count: 0,
      total: 0,
      isFrom: false,
      hasByRequest: false,
    });
  });

  it("суммирует точные цены выбранных услуг", () => {
    const selected = [svc("a", 400, 600), svc("b", 300, 500)];
    expect(calculatePrice(selected, "network")).toEqual({
      count: 2,
      total: 700,
      isFrom: false,
      hasByRequest: false,
    });
  });

  it("переключение материалов меняет сумму", () => {
    const selected = [svc("a", 400, 600), svc("b", 300, 500)];
    expect(calculatePrice(selected, "network").total).toBe(700);
    expect(calculatePrice(selected, "client").total).toBe(1100);
  });

  it("бесплатная работа (0) учитывается как известная и не ломает сумму", () => {
    const selected = [svc("oil", 0, { from: 700 }), svc("cabin", { from: 400 }, { from: 600 })];
    const network = calculatePrice(selected, "network");
    expect(network.total).toBe(400);
    expect(network.isFrom).toBe(true);
  });

  it("цена «от» помечает итог флагом isFrom", () => {
    const selected = [svc("a", { from: 800 }, { from: 1200 })];
    expect(calculatePrice(selected, "network")).toMatchObject({ total: 800, isFrom: true });
  });

  it("услуга «по запросу» (null) исключается из суммы и помечается флагом", () => {
    const selected = [svc("a", 500, 700), svc("clutch", null, null)];
    const result = calculatePrice(selected, "network");
    expect(result.total).toBe(500);
    expect(result.hasByRequest).toBe(true);
    expect(result.count).toBe(2);
  });
});
