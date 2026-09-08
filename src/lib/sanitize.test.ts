import { describe, expect, it } from "vitest";
import { sanitizeText } from "./sanitize";

describe("sanitizeText", () => {
  it("пустой/пустышка → пустая строка", () => {
    expect(sanitizeText(null)).toBe("");
    expect(sanitizeText(undefined)).toBe("");
    expect(sanitizeText("   ")).toBe("");
  });

  it("удаляет HTML-теги", () => {
    expect(sanitizeText("<b>Замена</b> <script>alert(1)</script>масла")).toBe("Замена масла");
  });

  it("схлопывает пробелы и переносы строк", () => {
    expect(sanitizeText("Замена\n\nмасла\t  и  фильтра")).toBe("Замена масла и фильтра");
  });

  it("обрезает по максимальной длине с многоточием", () => {
    const long = "а".repeat(300);
    const result = sanitizeText(long, 10);
    expect(result.length).toBe(10);
    expect(result.endsWith("…")).toBe(true);
  });
});
