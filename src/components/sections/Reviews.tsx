import Link from "next/link";
import { Container, Section, buttonVariants } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { yandexReviewsWidgetSrc } from "@/content/integrations";
import { SectionHeading } from "./SectionHeading";
import { LazyEmbed } from "./LazyEmbed";

/**
 * Отзывы: ленивый виджет Яндекс.Карт (грузится при скролле).
 * Пока нет id организации — показываем ссылки на карточки в 2ГИС (там реальные отзывы).
 */
export function Reviews() {
  return (
    <Section surface="light">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          subtitle="Оценки и отзывы о наших точках на картах."
        />
        <LazyEmbed
          src={yandexReviewsWidgetSrc}
          title="Отзывы о Масло Плюс на Яндекс.Картах"
          fallback={
            <div className="text-center">
              <p className="text-muted">
                Виджет отзывов Яндекс подключим с id организации. Пока — отзывы в 2ГИС:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {siteConfig.locations.map(
                  (location) =>
                    location.maps.gis2 && (
                      <Link
                        key={location.slug}
                        href={location.maps.gis2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "secondary", size: "sm" })}
                      >
                        {location.addressStreet}
                      </Link>
                    ),
                )}
              </div>
            </div>
          }
        />
      </Container>
    </Section>
  );
}
