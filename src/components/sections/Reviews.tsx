import Link from "next/link";
import { Container, Section, buttonVariants } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { ReviewsTabs, type ReviewsLocation } from "./ReviewsTabs";

/**
 * Отзывы: официальные виджеты Яндекс.Карт по каждой точке сети (ленивые iframe).
 * Точки без id организации сюда не попадают; если ни у одной нет id —
 * показываем аккуратный фолбэк со ссылками на карточки в 2ГИС.
 */
export function Reviews() {
  const reviewLocations: ReviewsLocation[] = siteConfig.locations
    .filter((location) => Boolean(location.reviewsWidgetId))
    .map((location) => ({
      slug: location.slug,
      label: location.addressStreet,
      widgetId: location.reviewsWidgetId as string,
    }));

  return (
    <Section surface="light">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          subtitle="Реальные отзывы с Яндекс.Карт — выберите точку сети."
        />

        {reviewLocations.length > 0 ? (
          <ReviewsTabs locations={reviewLocations} />
        ) : (
          <div className="text-center">
            <p className="text-muted">Виджет отзывов подключим позже. Пока — отзывы в 2ГИС:</p>
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
        )}
      </Container>
    </Section>
  );
}
