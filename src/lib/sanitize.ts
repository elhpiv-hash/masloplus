/** Управляющие ASCII-символы (0x00–0x1F и 0x7F) — строим из строки, без литералов в исходнике. */
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

/** Блоки script/style — вырезаем целиком (вместе с содержимым). */
const SCRIPT_STYLE_BLOCKS = /<(script|style)[^>]*>[\s\S]*?<\/\1>/gi;

/**
 * Санитизация внешнего текста (подписи из VK/Telegram) перед выводом.
 * Убирает HTML-теги, управляющие символы, схлопывает пробелы и ограничивает длину.
 * Это не полноценный HTML-санитайзер (мы и не выводим HTML) — текст выводится как обычная строка.
 */
export function sanitizeText(input: string | null | undefined, maxLength = 280): string {
  if (!input) return "";

  const withoutBlocks = input.replace(SCRIPT_STYLE_BLOCKS, " ");
  const withoutTags = withoutBlocks.replace(/<[^>]*>/g, " ");
  const withoutControls = withoutTags.replace(CONTROL_CHARS, " ");
  const collapsed = withoutControls.replace(/\s+/g, " ").trim();

  if (collapsed.length <= maxLength) return collapsed;
  return `${collapsed.slice(0, maxLength - 1).trimEnd()}…`;
}
