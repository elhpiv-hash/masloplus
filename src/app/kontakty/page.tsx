import Link from "next/link";
import { Card, Container, Section, buttonVariants } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { sonlineBookingUrl } from "@/content/integrations";
import { LocationItem } from "@/components/layout/LocationItem";
import { LocationsMap } from "@/components/sections";
import { LazyEmbed } from "@/components/sections/LazyEmbed";
import { LocationsJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Контакты",
  description:
    "Контакты автосервиса «Масло Плюс» в Чебоксарах: 3 точки, адреса, телефоны, график работы, карта. Онлайн-запись.",
  path: "/kontakty",
});

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

      {/* Онлайн-запись через SONLINE (сервис приёма заявок сети) */}
      <Section surface="light">
        <Container className="space-y-6">
          <div id="zapis" className="scroll-mt-28" />
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Онлайн-запись</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Выберите ближайшую точку, услугу и удобное время — подтверждение придёт сразу.
            </p>
          </div>

          <LazyEmbed
            src={sonlineBookingUrl}
            title="Онлайн-запись Масло Плюс (SONLINE)"
            heightClassName="h-[760px]"
            fallback={null}
          />

          <p className="text-sm text-muted">
            Виджет не загрузился?{" "}
            <Link
              href={sonlineBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-strong underline underline-offset-2"
            >
              Открыть онлайн-запись в новой вкладке
            </Link>
          </p>
        </Container>
      </Section>

      {/* Точки сети */}
      <Section surface="light" className="pt-0">
        <Container className="space-y-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">Наши точки</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.locations.map((location) => (
              <Card key={location.slug} className="flex flex-col p-5">
                <LocationItem location={location} showHours />
                {location.maps.gis2 && (
                  <Link
                    href={location.maps.gis2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "secondary",
                      size: "sm",
                      className: "mt-4 self-start",
                    })}
                  >
                    Открыть в 2ГИС
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <LocationsMap />
    </main>
  );
}
