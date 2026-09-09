/**
 * Префикс basePath для ассетов из public/.
 *
 * На GitHub Pages сайт живёт в подкаталоге (basePath = "/masloplus"). Next
 * автоматически префиксует роуты, _next/ и Link, но НЕ файлы из public/,
 * если ссылаться на них абсолютным путём ("/brand/logo.png"). Из-за этого
 * такие картинки 404-ят на Pages. Оборачиваем их src в asset().
 *
 * В обычной сборке (без basePath) — no-op. Внешние URL не трогаем.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
