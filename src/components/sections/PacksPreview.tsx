import Link from "next/link";
import { Badge, Card, Container, Section, buttonVariants } from "@/components/ui";
import { packsPreview } from "@/content/home";
import { formatPrice } from "@/lib/format";
import { SectionHeading } from "./SectionHeading";

const TIERS = ["Бюджет", "Премиум"] as const;

/** Превью популярных наборов ТО. Полный раздел с поиском — /nabory (Промт 7). */
export function PacksPreview() {
  return (
    <Section surface="dark">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Готовые наборы ТО"
          title="Наборы под ваш автомобиль"
          subtitle="Масло и фильтры под конкретную модель — тарифы Бюджет и Премиум."
          action={{ label: "Все наборы", href: "/nabory" }}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {packsPreview.map((pack) => (
            <Card key={pack.slug} className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {pack.brand} {pack.model}
                  </h3>
                  <p className="text-sm text-muted">{pack.engine}</p>
                </div>
                {pack.best && <Badge variant="accent">Лучший выбор</Badge>}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {TIERS.map((tier) => (
                  <Badge key={tier} variant="outline">
                    {tier}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 flex-1" />

              <div className="flex items-baseline justify-between">
                {pack.fromPrice ? (
                  <p>
                    <span className="text-sm text-muted">от </span>
                    <span className="font-display text-xl font-bold text-ink">
                      {formatPrice(pack.fromPrice)}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted">Цена по запросу</p>
                )}
              </div>

              <Link
                href="/nabory"
                className={buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  className: "mt-4 w-full",
                })}
              >
                Подробнее
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
