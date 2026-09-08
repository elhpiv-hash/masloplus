import Link from "next/link";
import { Container, Section, buttonVariants } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { yandexMapWidgetSrc } from "@/content/integrations";
import { SectionHeading } from "./SectionHeading";
import { LazyEmbed } from "./LazyEmbed";

/**
 * Карта с 3 точками: ленивый виджет Яндекс.Карт (грузится при скролле).
 * Пока нет ключа/виджета — показываем адреса с переходом в 2ГИС. Полная карта — на /kontakty.
 */
export function LocationsMap() {
  return (
    <Section surface="light" className="pt-0">
      <Container className="space-y-8">
        <SectionHeading eyebrow="На карте" title="Наши точки в Чебоксарах" />
        <LazyEmbed
          src={yandexMapWidgetSrc}
          title="Карта точек Масло Плюс на Яндекс.Картах"
          heightClassName="min-h-[320px]"
          fallback={
            <div className="w-full">
              <p className="text-center text-muted-foreground">
                Интерактивную карту Яндекс подключим позже. Адреса и маршруты:
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {siteConfig.locations.map((location) => (
                  <li
                    key={location.slug}
                    className="rounded-xl border border-border bg-card p-4 text-center"
                  >
                    <p className="font-medium text-foreground">{location.addressStreet}</p>
                    {location.maps.gis2 && (
                      <Link
                        href={location.maps.gis2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "secondary",
                          size: "sm",
                          className: "mt-3",
                        })}
                      >
                        Открыть в 2ГИС
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </Container>
    </Section>
  );
}
