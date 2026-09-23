import type { Config } from "tailwindcss";

/**
 * Дизайн-система «Масло Плюс» — фирменные цвета: синий / жёлтый / белый.
 * Правила: мягкий белый — доминирующий фон (~60%); синий — основной бренд
 * (шапка/футер, заголовки, ключевые секции, ~30%); жёлтый — ТОЛЬКО акцент
 * (CTA, активные состояния, иконки, разделители, ~10%). Жёлтым не заливать большие площади.
 *
 * Цвета делятся на два вида:
 *  1) Фиксированные бренд-цвета (primary — синий, accent — жёлтый).
 *  2) Семантические токены поверхностей (background/surface/ink/muted/border/ring)
 *     — CSS-переменные в globals.css, переключаются на тёмных (синих) секциях.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        white: "#ffffff",
        // Бренд-синий (щит): шапка/футер, заголовки, вторичные кнопки, ключевые секции.
        primary: {
          DEFAULT: "#173A8B",
          dark: "#0E2559", // тёмные секции, футер
          bright: "#2B5BD0", // ссылки, ховеры
          foreground: "#FFFFFF",
        },
        // Бренд-жёлтый: ТОЛЬКО акцент — CTA, активные состояния, иконки, разделители.
        accent: {
          DEFAULT: "#F7C31C",
          dark: "#E0A400", // ховер жёлтых кнопок
          foreground: "#0F1B33", // тёмно-синий текст на жёлтом
          // Акцентный ТЕКСТ на поверхности (CSS-переменная: светлая→синий, тёмная→жёлтый).
          strong: "var(--accent-strong)",
        },
        // Семантические токены поверхностей (см. globals.css, переключаются data-surface).
        background: "var(--background)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        border: "var(--border)",
        ring: "var(--ring)",
        // Обратная совместимость (старые имена → те же переменные).
        foreground: "var(--ink)",
        card: "var(--surface)",
      },
      fontFamily: {
        // CSS-переменные задаёт next/font (кириллический subset) в layout.tsx.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Без var(--font-sans): заголовки не «прыгают» на свопе Inter — только
        // Montserrat и его size-adjust фолбэк (см. layout.tsx, display: optional).
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,27,51,0.06), 0 1px 3px rgba(15,27,51,0.10)",
        card: "0 2px 8px rgba(15,27,51,0.06), 0 10px 30px rgba(15,27,51,0.08)",
        elevated: "0 16px 48px rgba(15,27,51,0.16)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        // Подсказка «сюда можно нажать» для кнопки на баннере героя:
        // расходящаяся белая волна (размер — CSS-переменная --cta-pulse,
        // меньше на телефоне) и синхронный блик, пробегающий по кнопке.
        // Волна белая, а не жёлтая: полупрозрачный жёлтый на синем баннере
        // смешивается в грязно-зелёный, белый даёт чистое голубое свечение.
        "cta-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(255,255,255,0.8)" },
          "70%, 100%": { boxShadow: "0 0 0 var(--cta-pulse, 10px) rgba(255,255,255,0)" },
        },
        "cta-shine": {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "40%, 100%": { transform: "translateX(300%) skewX(-20deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-in-right": "slide-in-right 0.25s ease-out both",
        // Задержка 0.6s — чтобы начать, когда слайд уже доехал (переход 0.5s).
        "cta-pulse": "cta-pulse 2.8s ease-out 0.6s infinite",
        "cta-shine": "cta-shine 2.8s ease-in-out 0.6s infinite backwards",
      },
    },
  },
  plugins: [],
};

export default config;
