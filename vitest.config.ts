import { defineConfig } from "vitest/config";

/**
 * Vitest — юнит-тесты чистой логики (напр. калькулятор стоимости, утилиты).
 * Окружение node: тестируем логику, а не DOM. UI-тесты добавим при необходимости.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
  },
});
