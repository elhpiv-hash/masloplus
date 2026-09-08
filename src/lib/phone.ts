/**
 * Нормализует телефон к формату +7XXXXXXXXXX (E.164 для РФ).
 * Возвращает "" для некорректного номера.
 */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (digits.length === 10) digits = `7${digits}`;
  if (digits.length === 11 && digits.startsWith("7")) return `+${digits}`;
  return "";
}

/** Проверка корректности российского номера. */
export function isValidPhone(raw: string): boolean {
  return /^\+7\d{10}$/.test(normalizePhone(raw));
}

/** Прогрессивная маска для поля ввода: +7 (XXX) XXX-XX-XX. */
export function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits === "") return "";
  if (digits[0] === "8") digits = `7${digits.slice(1)}`;
  if (digits[0] !== "7") digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let result = "+7";
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) result += ")";
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;
  return result;
}
