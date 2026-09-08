import type { Config } from "tailwindcss";

/**
 * Дизайн-система «Масло Плюс».
 * Характер: строгий, аккуратный, «дорогой». Графитовая база + тёплый янтарный акцент.
 * Все токены живут здесь — в компонентах не должно быть «магических» значений.
 *
 * Цвета делятся на два вида:
 *  1) Фиксированные шкалы (graphite, accent) — одинаковы в любой теме.
 *  2) Семантические токены поверхностей (background/foreground/card/muted/border/ring)
 *     — заданы CSS-переменными в globals.css и переключаются на тёмных секциях.
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
        // Холодная графитовая нейтраль — база интерфейса.
        graphite: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d6dadf",
          300: "#b4bac2",
          400: "#8a929c",
          500: "#656d78",
          600: "#4b525b",
          700: "#383e45",
          800: "#24282d",
          900: "#16191d",
          950: "#0c0e11",
        },
        // Тёплый янтарный акцент — «масло», энергия, премиальность.
        accent: {
          50: "#fff4ed",
          100: "#ffe6d5",
          200: "#feccaa",
          300: "#fdac74",
          400: "#fb833c",
          500: "#f26419",
          600: "#e14e0b",
          700: "#ba3c0c",
          800: "#942f10",
          900: "#782910",
          950: "#410f06",
          // Текст поверх акцентной заливки (тёмный — контраст на янтаре высокий).
          foreground: "#0c0e11",
          // Акцентный ТЕКСТ на поверхности (CSS-переменная: светлая→700, тёмная→500) — AA.
          strong: "var(--accent-strong)",
        },
        // Семантические токены поверхностей (см. globals.css).
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
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
        soft: "0 1px 2px rgba(12,14,17,0.06), 0 1px 3px rgba(12,14,17,0.10)",
        card: "0 2px 8px rgba(12,14,17,0.06), 0 10px 30px rgba(12,14,17,0.08)",
        elevated: "0 16px 48px rgba(12,14,17,0.16)",
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
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-in-right": "slide-in-right 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
