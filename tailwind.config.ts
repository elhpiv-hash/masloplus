import type { Config } from "tailwindcss";

/**
 * Базовый Tailwind-конфиг (Промт 2).
 * Полная дизайн-система (палитра, типографика, отступы, радиусы, тени)
 * добавляется в Промте 3 — здесь только каркас, чтобы сборка работала.
 * Правило проекта: все токены живут ЗДЕСЬ, без «магических» значений в компонентах.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        // Значения CSS-переменных задаёт next/font в layout.tsx (кириллический subset).
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
