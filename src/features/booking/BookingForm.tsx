"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatPhone } from "@/lib/phone";
import { Button, Card, Checkbox, Input, Textarea } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { packs } from "@/content/packs";
import { bookingSchema, fieldErrors } from "./schema";

/** Собирает человекочитаемую услугу из query (перенос из калькулятора/наборов). */
function buildServiceFromParams(params: URLSearchParams): string {
  const uslugi = params.get("uslugi");
  if (uslugi) {
    const titles = uslugi
      .split(",")
      .map((slug) => services.find((service) => service.slug === slug)?.title)
      .filter((title): title is string => Boolean(title));
    if (titles.length) return `Услуги: ${titles.join(", ")}`;
  }
  const nabor = params.get("nabor");
  if (nabor) {
    const pack = packs.find((item) => item.slug === nabor);
    if (pack) {
      const tarif = params.get("tarif");
      return `Набор ТО: ${pack.brand} ${pack.model}${tarif ? ` (${tarif})` : ""}`;
    }
  }
  const zapros = params.get("zapros");
  if (zapros) return `Расчёт стоимости: ${zapros}`;
  return "";
}

type Status = "idle" | "submitting" | "success" | "error";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingForm() {
  const params = useSearchParams();
  const prefillService = useMemo(() => buildServiceFromParams(params), [params]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locationSlug, setLocationSlug] = useState(siteConfig.locations[0].slug);
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const startedAtRef = useRef<number>(Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (prefillService) setService(prefillService);
  }, [prefillService]);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerError("");

    const payload = {
      name,
      phone,
      locationSlug,
      service: service || undefined,
      comment: comment || undefined,
      consent,
      website,
      ts: startedAtRef.current,
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(data.error || "Не удалось отправить заявку. Попробуйте позже.");
      }
    } catch {
      setStatus("error");
      setServerError("Ошибка сети. Проверьте соединение и попробуйте снова.");
    }
  }

  if (status === "success") {
    return (
      <Card className="p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold">Заявка отправлена</h3>
        <p className="mt-2 text-muted-foreground">
          Мы свяжемся с вами в рабочее время, чтобы подтвердить запись. Если нужно срочно —
          позвоните нам.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold">Записаться онлайн</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Оставьте контакты — перезвоним и подтвердим удобное время.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <Field id="booking-name" label="Имя" error={errors.name}>
          <Input
            id="booking-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field id="booking-phone" label="Телефон" error={errors.phone}>
          <Input
            id="booking-phone"
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>

        <Field id="booking-location" label="Точка" error={errors.locationSlug}>
          <select
            id="booking-location"
            value={locationSlug}
            onChange={(event) => setLocationSlug(event.target.value)}
            className="flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {siteConfig.locations.map((location) => (
              <option key={location.slug} value={location.slug}>
                {location.addressStreet}
              </option>
            ))}
          </select>
        </Field>

        <Field id="booking-service" label="Услуга (необязательно)" error={errors.service}>
          <Input
            id="booking-service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            placeholder="Например: замена масла"
          />
        </Field>

        <Field id="booking-comment" label="Комментарий (необязательно)" error={errors.comment}>
          <Textarea
            id="booking-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Марка, модель, пожелания по времени…"
          />
        </Field>

        {/* Honeypot — скрыто от людей, видно ботам. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="booking-website">Не заполняйте это поле</label>
          <input
            id="booking-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className={cn(errors.consent && "rounded-lg ring-1 ring-red-500/50")}>
          <Checkbox
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            label={
              <>
                Согласен на обработку персональных данных и с{" "}
                <Link href="/policy" className="text-accent-600 underline underline-offset-2">
                  Политикой обработки ПД
                </Link>
              </>
            }
          />
        </div>
        {errors.consent && (
          <p className="text-xs text-red-600" role="alert">
            {errors.consent}
          </p>
        )}

        {serverError && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-700" role="alert">
            {serverError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Отправляем…" : "Записаться"}
        </Button>
      </form>
    </Card>
  );
}
