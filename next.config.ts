import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * Пока СТРОГАЯ: только собственный источник, объекты запрещены, фреймы запрещены.
 * Белый список для embed (VK Видео, RuTube, Яндекс.Карты/Метрика) добавим позже
 * (Промт 8 — галерея, Промт 10 — аналитика/карты, Промт 12 — аудит).
 *
 * 'unsafe-inline' для script/style — вынужденный компромисс App Router без nonce;
 * в Промте 12 (аудит) ужесточим через nonce/строгую политику. В dev дополнительно
 * нужен 'unsafe-eval' и ws: для HMR — включаем только в режиме разработки.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Картинки: свои + data/blob + CDN VK и RuTube (фото/превью из галереи).
  "img-src 'self' data: blob: https://*.userapi.com https://*.vk.com https://*.rutube.ru",
  "font-src 'self' data:",
  // Видео-embed: только белый список — VK Видео и RuTube (YouTube не используем).
  "frame-src https://vk.com https://vkvideo.ru https://rutube.ru",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
