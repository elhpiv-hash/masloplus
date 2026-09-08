import { NextResponse, type NextRequest } from "next/server";
import { bookingSchema, toBookingData } from "@/features/booking/schema";
import { rateLimit } from "@/lib/rate-limit";
import { verifyCaptcha } from "@/lib/smartcaptcha";
import { sendBooking } from "@/lib/booking-transport";

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  // Rate limiting эндпоинта.
  if (!rateLimit(`booking:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много попыток. Попробуйте через минуту." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос." }, { status: 400 });
  }

  // Серверная валидация (та же схема, что на клиенте).
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Проверьте правильность полей." },
      { status: 422 },
    );
  }
  const input = parsed.data;

  // Honeypot: бот заполнил скрытое поле — тихо «принимаем» и ничего не шлём.
  if (input.website && input.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Временная ловушка: форма отправлена подозрительно быстро.
  if (typeof input.ts === "number" && Date.now() - input.ts < 2000) {
    return NextResponse.json(
      { ok: false, error: "Слишком быстро — попробуйте ещё раз." },
      { status: 429 },
    );
  }

  // SmartCaptcha (если подключена ключами в .env).
  const captchaOk = await verifyCaptcha(input.captchaToken, ip);
  if (!captchaOk) {
    return NextResponse.json(
      { ok: false, error: "Не пройдена проверка. Повторите." },
      { status: 400 },
    );
  }

  try {
    await sendBooking(toBookingData(input));
  } catch {
    // Никаких ПД в логах.
    console.error("[booking] delivery failed");
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Позвоните нам или попробуйте позже." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
