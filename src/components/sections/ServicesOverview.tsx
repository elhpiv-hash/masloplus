import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, Container, Section } from "@/components/ui";
import { asset } from "@/lib/asset";
import { serviceCategories, services } from "@/content/services";
import type { ServiceCategoryKey } from "@/types/services";
import { SectionHeading } from "./SectionHeading";

const iconProps = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const categoryIcons: Record<ServiceCategoryKey, ReactNode> = {
  engine: (
    <svg {...iconProps}>
      <path d="M12 3c3 3.4 5 6.2 5 8.7A5 5 0 0 1 7 11.7C7 9.2 9 6.4 12 3Z" />
    </svg>
  ),
  transmission: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" />
    </svg>
  ),
  filters: (
    <svg {...iconProps}>
      <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />
    </svg>
  ),
  extra: (
    <svg {...iconProps}>
      <path d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.4l-5.3 5.3a1.6 1.6 0 0 0 2.2 2.2l5.3-5.3a3.5 3.5 0 0 0 4.4-4.6l-2 2-1.8-1.8 2-2Z" />
    </svg>
  ),
};

/**
 * Обзор услуг: крупные карточки категорий со списком конкретных работ и
 * стрелкой-переходом на /uslugi (по образцу masloff.ru, в наших цветах).
 */
export function ServicesOverview() {
  return (
    <Section surface="light">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Услуги"
          title="Наши услуги"
          subtitle="Полный спектр по маслам и техническим жидкостям, а также сопутствующие работы."
          action={{ label: "Все услуги и цены", href: "/uslugi" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => {
            const items = services.filter((service) => service.categorySlug === category.slug);
            return (
              <Link
                key={category.slug}
                href="/uslugi"
                aria-label={`${category.title} — все услуги и цены`}
                className="group rounded-2xl focus-visible:outline-none"
              >
                <Card
                  interactive
                  className="flex h-full flex-col overflow-hidden p-6 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background"
                >
                  {category.image && (
                    <div className="relative -mx-6 -mt-6 mb-5 h-36 sm:h-40">
                      <Image
                        src={asset(category.image)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/10 text-accent-strong">
                      {categoryIcons[category.slug]}
                    </span>
                    <h3 className="font-display text-lg font-semibold">{category.title}</h3>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {items.slice(0, 4).map((service) => (
                      <li key={service.slug} className="flex gap-2 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent"
                        />
                        <span>{service.title}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-medium text-accent-strong">
                    Подробнее
                    <svg
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
