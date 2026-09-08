import Link from "next/link";
import { siteConfig } from "@/content/site";

/**
 * Главная — заглушка (Промт 2). Полноценные секции соберём в Промте 5.
 * Временная навигация помогает проверить ЧПУ-роуты.
 */
const routes = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/nabory", label: "Готовые наборы ТО" },
  { href: "/galereya", label: "Галерея" },
  { href: "/kontakty", label: "Контакты" },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm uppercase tracking-wide text-neutral-500">
        {siteConfig.brand} · Чебоксары
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Замена масла и ТО — быстро, прозрачно, с гарантией
      </h1>
      <p className="mt-4 text-neutral-600">
        Каркас сайта. Секции главной страницы появятся в следующих шагах. Пока — навигация по
        разделам:
      </p>
      <nav className="mt-8">
        <ul className="space-y-2">
          {routes.map((route) => (
            <li key={route.href}>
              <Link className="text-blue-700 underline underline-offset-4" href={route.href}>
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
