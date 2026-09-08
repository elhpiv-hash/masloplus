import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy — строгая база + точечный белый список.
 *
 * default-src 'self': по умолчанию только собственный источник. Объекты и обрамление
 * нашего сайта запрещены (object-src/frame-ancestors 'none'). Внешнее разрешено только
 * там, где это реально нужно:
 *  - frame-src: VK Видео, RuTube (видео галереи), Яндекс.Карты (карта/отзывы),
 *    Яндекс SmartCaptcha (антиспам форм). YouTube НЕ разрешён.
 *  - img-src: CDN VK/RuTube (фото галереи) + пиксель Яндекс.Метрики.
 *  - script-src/connect-src: Яндекс.Метрика и SmartCaptcha.
 *
 * Компромисс: 'unsafe-inline' в script-src нужен для инлайновой загрузки Next App Router,
 * JSON-LD и сниппета Метрики (nonce на статическом экспорте недоступен). Это осознанный
 * баланс; XSS-риск снижается тем, что весь внешний контент санитизируется, а список
 * доменов ограничен. В dev дополнительно нужны 'unsafe-eval' и ws: (HMR) — только в dev.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Картинки: свои + data/blob + CDN VK/RuTube (галерея) + пиксель Яндекс.Метрики.
  "img-src 'self' data: blob: https://*.userapi.com https://*.vk.com https://*.rutube.ru https://mc.yandex.ru",
  "font-src 'self' data:",
  // Embed по белому списку: VK Видео, RuTube, Яндекс.Карты, SmartCaptcha. YouTube не используем.
  "frame-src https://vk.com https://vkvideo.ru https://rutube.ru https://yandex.ru https://smartcaptcha.yandexcloud.net",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://smartcaptcha.yandexcloud.net https://mc.yandex.ru`,
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self'${isDev ? " ws:" : ""} https://smartcaptcha.yandexcloud.net https://mc.yandex.ru`,
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

// Статический экспорт для превью на GitHub Pages (включается флагом в CI).
// ВНИМАНИЕ: на статике не работают API-роут формы и security-заголовки (нет сервера) —
// это только витрина-демо. Боевой запуск — на хосте с Node (см. README, Промт 13).
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport
    ? {
        output: "export",
        images: { unoptimized: true },
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
