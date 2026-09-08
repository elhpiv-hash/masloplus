/**
 * Серверная проверка Яндекс SmartCaptcha.
 * Если серверный ключ не задан — капча считается выключенной (возвращаем true).
 * Ключи только серверные (SMARTCAPTCHA_SERVER_KEY), клиенту не отдаются.
 */
export async function verifyCaptcha(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.SMARTCAPTCHA_SERVER_KEY;
  if (!secret) return true; // капча не подключена
  if (!token) return false;

  const url = new URL("https://smartcaptcha.yandexcloud.net/validate");
  url.searchParams.set("secret", secret);
  url.searchParams.set("token", token);
  url.searchParams.set("ip", ip);

  try {
    const response = await fetch(url, { method: "GET" });
    const data = (await response.json()) as { status?: string };
    return data.status === "ok";
  } catch {
    // Не блокируем пользователя из-за сбоя капчи-сервиса, но и не логируем ПД.
    return true;
  }
}
