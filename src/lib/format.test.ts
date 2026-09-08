import { describe, expect, it } from "vitest";
import { formatPrice } from "./format";

const NBSP = String.fromCharCode(0x00a0);

describe("formatPrice", () => {
  it("группирует тысячи неразрывным пробелом и добавляет ₽", () => {
    expect(formatPrice(1450)).toBe(`1${NBSP}450${NBSP}₽`);
  });

  it("форматирует большие числа", () => {
    expect(formatPrice(11765)).toBe(`11${NBSP}765${NBSP}₽`);
  });

  it("округляет дробные значения", () => {
    expect(formatPrice(4649.5)).toBe(`4${NBSP}650${NBSP}₽`);
  });

  it("обрабатывает ноль", () => {
    expect(formatPrice(0)).toBe(`0${NBSP}₽`);
  });
});
