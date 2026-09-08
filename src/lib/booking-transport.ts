import { siteConfig } from "@/content/site";
import type { BookingData } from "@/features/booking/schema";

/**
 * Доставка заявки. Секреты — только из .env (серверно), клиенту не отдаются.
 * Реализован Telegram-канал (мгновенно). Email можно добавить позже (нужен SMTP-клиент, напр. nodemailer).
 *
 * ПД (имя/телефон/комментарий) уходят ТОЛЬКО в мессенджер владельца и НЕ пишутся в логи.
 */
export async function sendBooking(data: BookingData): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    await sendTelegram(token, chatId, data);
    return;
  }

  // Канал доставки ещё не настроен: заявку принимаем, но не теряем сам факт (без ПД в логе).
  console.warn("[booking] transport is not configured — set TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID");
}

function locationTitle(slug: string): string {
  return siteConfig.locations.find((location) => location.slug === slug)?.addressStreet ?? slug;
}

async function sendTelegram(token: string, chatId: string, data: BookingData): Promise<void> {
  const lines = [
    "🔧 Новая заявка — Масло Плюс",
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Точка: ${locationTitle(data.locationSlug)}`,
    data.service ? `Услуга: ${data.service}` : null,
    data.comment ? `Комментарий: ${data.comment}` : null,
  ].filter(Boolean);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
  });

  if (!response.ok) throw new Error("telegram send failed");
}
