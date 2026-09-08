import { describe, expect, it } from "vitest";
import { formatPhone, isValidPhone, normalizePhone } from "./phone";

describe("normalizePhone", () => {
  it("нормализует разные формы к +7XXXXXXXXXX", () => {
    expect(normalizePhone("89093001060")).toBe("+79093001060");
    expect(normalizePhone("9093001060")).toBe("+79093001060");
    expect(normalizePhone("+7 (909) 300-10-60")).toBe("+79093001060");
  });
  it("возвращает пустую строку для некорректного", () => {
    expect(normalizePhone("123")).toBe("");
    expect(normalizePhone("")).toBe("");
  });
});

describe("isValidPhone", () => {
  it("проверяет российский номер", () => {
    expect(isValidPhone("+7 909 300-10-60")).toBe(true);
    expect(isValidPhone("123")).toBe(false);
  });
});

describe("formatPhone", () => {
  it("прогрессивно форматирует ввод", () => {
    expect(formatPhone("")).toBe("");
    expect(formatPhone("9093001060")).toBe("+7 (909) 300-10-60");
    expect(formatPhone("89093001060")).toBe("+7 (909) 300-10-60");
  });
});
