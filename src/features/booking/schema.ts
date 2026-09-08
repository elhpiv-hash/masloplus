import { z } from "zod";
import { isValidPhone, normalizePhone } from "@/lib/phone";

/** Схема заявки — используется и на клиенте, и на сервере (одна правда). */
export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Слишком длинное имя"),
  phone: z.string().refine(isValidPhone, "Введите корректный телефон"),
  locationSlug: z.string().min(1, "Выберите точку"),
  service: z.string().max(300).optional(),
  comment: z.string().max(1000, "Слишком длинный комментарий").optional(),
  consent: z.boolean().refine((value) => value === true, "Требуется согласие на обработку ПД"),

  // Анти-спам (не ПД, не логируется):
  // honeypot — у людей пусто; заполнено ботом → тихо принимаем в роуте (не режем валидацией).
  website: z.string().max(200).optional(),
  ts: z.number().optional(), // метка времени старта формы (временная ловушка)
  captchaToken: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/** Полезные данные заявки (нормализованные, без анти-спам полей). */
export type BookingData = {
  name: string;
  phone: string;
  locationSlug: string;
  service?: string;
  comment?: string;
};

export function toBookingData(input: BookingInput): BookingData {
  return {
    name: input.name.trim(),
    phone: normalizePhone(input.phone),
    locationSlug: input.locationSlug,
    service: input.service?.trim() || undefined,
    comment: input.comment?.trim() || undefined,
  };
}

/** Превращает issues zod в карту «поле → сообщение» (версионно-независимо). */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !result[key]) result[key] = issue.message;
  }
  return result;
}
