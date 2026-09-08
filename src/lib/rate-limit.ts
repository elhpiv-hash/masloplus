type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Простой in-memory rate limiter (на процесс). Достаточно как базовая защита эндпоинта.
 * Для нескольких инстансов/боевого масштаба — заменить на общий store (Redis и т. п.).
 * Возвращает true, если запрос разрешён.
 */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}
