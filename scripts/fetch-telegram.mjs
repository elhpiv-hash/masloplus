// @ts-check
/**
 * Синхронизация видео из публичного Telegram-канала в галерею сайта.
 *
 * Что делает:
 *  1. Тянет публичную веб-версию ленты канала (https://t.me/s/<channel>).
 *  2. Находит посты с видео, вытаскивает id поста, постер-кадр, подпись и дату.
 *  3. Скачивает постеры в public/gallery/telegram/<id>.jpg (self-hosted — не нужно
 *     расширять img-src в CSP, и превью не зависит от жизни ссылок Telegram CDN).
 *  4. Пишет src/content/telegram-gallery.generated.ts — типизированный список
 *     GalleryVideo, который подхватывает lib/gallery.ts.
 *
 * Само видео проигрывается официальным embed'ом Telegram (t.me/<channel>/<id>?embed=1)
 * внутри лайтбокса — токены на прямые mp4 в Telegram недолговечны, поэтому их не храним.
 *
 * Запуск: npm run fetch:telegram. На CI — .github/workflows/telegram.yml (cron).
 */
import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const CHANNEL = process.env.TELEGRAM_CHANNEL ?? "masloplus";
/** Сколько последних видео держим в галерее. */
const MAX_ITEMS = 24;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const THUMBS_DIR = join(ROOT, "public", "gallery", "telegram");
const OUT_FILE = join(ROOT, "src", "content", "telegram-gallery.generated.ts");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/** Декодирует базовые HTML-сущности из текста поста. */
function decodeEntities(input) {
  return input
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** Вытаскивает текст подписи поста: <br> → перевод строки, теги вырезаются. */
function extractCaption(block) {
  const m = block.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/);
  if (!m) return "";
  const withBreaks = m[1].replace(/<br\s*\/?>/gi, "\n");
  const noTags = withBreaks.replace(/<[^>]+>/g, "");
  return decodeEntities(noTags)
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Первая непустая строка подписи → заголовок (для aria-label и лайтбокса). */
function toTitle(caption) {
  const firstLine = caption.split("\n").find((l) => l.trim().length > 0) ?? "";
  const clean = firstLine.trim();
  if (!clean) return "Видео · Масло Плюс";
  return clean.length > 80 ? `${clean.slice(0, 79).trimEnd()}…` : clean;
}

/** Компактная подпись для лайтбокса (полную всё равно показывает embed). */
function toCaption(caption) {
  const oneLine = caption.replace(/\s+/g, " ").trim();
  if (!oneLine) return undefined;
  return oneLine.length > 160 ? `${oneLine.slice(0, 159).trimEnd()}…` : oneLine;
}

/** Разбирает HTML ленты в список видео-постов (в порядке от старых к новым). */
function parseVideos(html) {
  const blocks = html
    .split(/<div class="tgme_widget_message [^"]*js-widget_message"/)
    .slice(1);
  const videos = [];
  for (const block of blocks) {
    if (!block.includes("tgme_widget_message_video_player")) continue;
    const id = (block.match(/data-post="[^/]+\/(\d+)"/) || [])[1];
    if (!id) continue;
    const thumb = (
      block.match(
        /tgme_widget_message_video_thumb[^>]*style="background-image:url\('([^']+)'\)/,
      ) || []
    )[1];
    if (!thumb) continue; // без постера в сетку не покажем — пропускаем
    const publishedAt = (block.match(/datetime="([^"]+)"/) || [])[1];
    const caption = extractCaption(block);
    videos.push({ id, thumb, publishedAt, caption });
  }
  return videos;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Скачивает постер в public/gallery/telegram/<id>.jpg (если его ещё нет).
 * Telegram CDN иногда отдаёт 500 — делаем несколько попыток. Возвращает true,
 * если постер на месте; false — если так и не удалось (видео тогда пропускаем).
 */
async function downloadThumb(id, url) {
  const file = join(THUMBS_DIR, `${id}.jpg`);
  if (existsSync(file)) return true;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 512) throw new Error("подозрительно маленький файл");
      await writeFile(file, buf);
      return true;
    } catch (err) {
      if (attempt === 3) {
        console.warn(`⚠ Постер ${id} не скачался (${err.message}) — видео пропущено.`);
        return false;
      }
      await sleep(attempt * 800);
    }
  }
  return false;
}

/** Удаляет постеры, которых больше нет в актуальном списке. */
async function pruneThumbs(keepIds) {
  const existing = await readdir(THUMBS_DIR);
  const keep = new Set(keepIds.map((id) => `${id}.jpg`));
  await Promise.all(
    existing
      .filter((name) => name.endsWith(".jpg") && !keep.has(name))
      .map((name) => rm(join(THUMBS_DIR, name))),
  );
}

function renderFile(items) {
  const body = items
    .map((it) => {
      const lines = [
        `    id: ${JSON.stringify(`tg-${it.id}`)},`,
        `    type: "video",`,
        `    video: { provider: "telegram", channel: ${JSON.stringify(CHANNEL)}, id: ${JSON.stringify(it.id)} },`,
        `    thumb: ${JSON.stringify(`/gallery/telegram/${it.id}.jpg`)},`,
        `    title: ${JSON.stringify(it.title)},`,
      ];
      if (it.caption) lines.push(`    caption: ${JSON.stringify(it.caption)},`);
      if (it.publishedAt) lines.push(`    publishedAt: ${JSON.stringify(it.publishedAt)},`);
      lines.push(`    sourceUrl: ${JSON.stringify(`https://t.me/${CHANNEL}/${it.id}`)},`);
      return `  {\n${lines.join("\n")}\n  },`;
    })
    .join("\n");

  return `// АВТОГЕНЕРАЦИЯ — не редактировать вручную.
// Источник: https://t.me/s/${CHANNEL}. Обновляется скриптом scripts/fetch-telegram.mjs
// (локально: npm run fetch:telegram; на CI: .github/workflows/telegram.yml).
import type { GalleryVideo } from "@/types/gallery";

/** Последние видео из Telegram-канала, свежие — сверху. */
export const telegramGallery: GalleryVideo[] = [
${body}
];
`;
}

async function main() {
  const res = await fetch(`https://t.me/s/${CHANNEL}`, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`feed: HTTP ${res.status}`);
  const html = await res.text();

  const parsed = parseVideos(html);
  // Свежие сверху, ограничиваем количество.
  const newestFirst = parsed
    .slice()
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, MAX_ITEMS);

  if (newestFirst.length === 0) {
    console.error("⚠ Видео в ленте не найдено — генерация пропущена (файл не тронут).");
    process.exit(0);
  }

  await mkdir(THUMBS_DIR, { recursive: true });
  const withThumb = [];
  for (const v of newestFirst) {
    if (await downloadThumb(v.id, v.thumb)) withThumb.push(v);
  }
  await pruneThumbs(withThumb.map((v) => v.id));

  if (withThumb.length === 0) {
    console.error("⚠ Не удалось скачать ни одного постера — файл не тронут.");
    process.exit(0);
  }

  const items = withThumb.map((v) => ({
    id: v.id,
    title: toTitle(v.caption),
    caption: toCaption(v.caption),
    publishedAt: v.publishedAt,
  }));

  await writeFile(OUT_FILE, renderFile(items), "utf8");
  console.log(`✔ Записано видео: ${items.length} → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error("Ошибка синхронизации Telegram:", err);
  process.exit(1);
});
