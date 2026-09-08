import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты автосервиса «Масло Плюс» в Чебоксарах: 3 точки, адреса, телефоны, график работы. Онлайн-запись.",
};

/**
 * Контакты — заглушка (Промт 2). Карта и форма записи будут в Промте 9.
 * Данные NAP берём из единого источника content/site.ts.
 */
export default function KontaktyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Контакты</h1>
      <ul className="mt-6 space-y-6">
        {siteConfig.locations.map((location) => (
          <li key={location.slug}>
            <h2 className="text-lg font-semibold">{location.addressStreet}</h2>
            <p className="text-sm text-neutral-500">
              {location.hours.weekdays} · {location.hours.weekend}
            </p>
            <ul className="mt-1">
              {location.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    className="text-blue-700 underline underline-offset-4"
                    href={`tel:${phone.tel}`}
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Link className="mt-8 inline-block text-blue-700 underline underline-offset-4" href="/">
        ← На главную
      </Link>
    </main>
  );
}
