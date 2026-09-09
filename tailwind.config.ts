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
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
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
        "cta-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-in-right": "slide-in-right 0.25s ease-out both",
        "cta-bounce": "cta-bounce 1.3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
