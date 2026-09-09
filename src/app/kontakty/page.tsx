import Link from "next/link";
import { Card, Container, Section, buttonVariants } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { sonlineBookingUrl } from "@/content/integrations";
import { LocationItem } from "@/components/layout/LocationItem";
import { LocationsMap } from "@/components/sections";
import { SocialCards } from "@/components/sections/SocialCards";
import { LocationsJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Контакты",
  description:
    "Контакты автосервиса «Масло Плюс» в Чебоксарах: 3 точки, адреса, телефоны, график работы, карта. Онлайн-запись.",
  path: "/kontakty",
});

/** Преимущества онлайн-записи (маленькие пункты в CTA-баннере). */
const bookingPerks = [
  "Без звонков и ожидания",
  "Выбор точки, услуги и времени",
  "Подтверждение сразу",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-none text-accent"
    >
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  );
}

export default function KontaktyPage() {
  return (
    <main>
      <LocationsJsonLd />
      <Section surface="dark">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Контакты
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Три точки в Чебоксарах. Запишитесь онлайн — выберите точку, услугу и удобное время.
          </p>
        </Container>
      </Section>

      {/* CTA онлайн-записи через SONLINE (открывается в новой вкладке) */}
      <Section surface="light">
        <Container>
          <div id="zapis" className="scroll-mt-28" />
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-10 text-white shadow-elevated sm:px-10 sm:py-12">
            {/* мягкое фирменное свечение */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary-bright/30 blur-3xl" />
            </div>

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_auto]">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-accent">
                  Онлайн-запись
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Запишитесь за минуту — без звонка
                </h2>
                <p className="mt-3 max-w-xl text-white/80">
                  Выберите ближайшую точку, нужную услугу и удобное время. Место и время
                  подтвердятся сразу.
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                  {bookingPerks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-white/90">
                      <CheckIcon />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Link
                  href={sonlineBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  Записаться онлайн
                </Link>
                <span className="text-xs text-white/60">Откроется сервис онлайн-записи</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Точки сети — с записью и 2ГИС по каждой */}
      <Section surface="light" className="pt-0">
        <Container className="space-y-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">Наши точки</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.locations.map((location) => (
              <Card key={location.slug} className="flex flex-col p-5">
                <LocationItem location={location} showHours />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={sonlineBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "primary", size: "sm" })}
                  >
                    Записаться
                  </Link>
                  {location.maps.gis2 && (
                    <Link
                      href={location.maps.gis2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "secondary", size: "sm" })}
                    >
                      2ГИС
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Соцсети */}
      <Section surface="light" className="pt-0">
        <Container className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Мы в соцсетях</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Акции, фото работ и новости сети — подписывайтесь на удобной площадке.
            </p>
          </div>
          <SocialCards />
        </Container>
      </Section>

      <LocationsMap />
    </main>
  );
}
