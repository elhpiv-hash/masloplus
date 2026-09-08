import Link from "next/link";
import { Container } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { legalNav, mainNav } from "@/content/navigation";
import { Logo } from "./Logo";
import { Socials } from "./Socials";
import { LocationItem } from "./LocationItem";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Тёмная поверхность — контрастный «дорогой» подвал; токены переключаются через data-surface.
    <footer data-surface="dark" className="border-t border-border bg-background text-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="text" />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Сеть автосервисов экспресс-замены масла и ТО в Чебоксарах. Прозрачные цены, гарантия
              на работы и материалы.
            </p>
            <Socials className="mt-5" />
          </div>

          <nav aria-label="Подвал: разделы">
            <p className="text-sm font-semibold">Разделы</p>
            <ul className="mt-3 flex flex-col gap-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded py-1 text-sm text-muted transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/*
            Адреса/телефоны/график — из единого источника site.ts.
            ВНИМАНИЕ: дом на Университетской (35Г/35А) требует подтверждения владельца — см. site.ts.
          */}
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-sm font-semibold">Наши точки</p>
            <div className="mt-3 grid gap-6 sm:grid-cols-2">
              {siteConfig.locations.map((location) => (
                <LocationItem key={location.slug} location={location} showHours />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.brand}. Чебоксары.
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded py-1 transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
