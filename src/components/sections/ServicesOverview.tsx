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
 * Обзор услуг: широкие карточки категорий (по образцу masloff.ru, в наших цветах).
 * Название + список конкретных работ + круглая кнопка-стрелка, а сбоку — «плавающий»
 * слот под фото детали, выступающий за верх карточки. Фото (прозрачный PNG) владелец
 * добавит позже через поле image в content/services.ts; пока — лёгкий плейсхолдер.
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

        <div className="grid gap-6 sm:grid-cols-2">
          {serviceCategories.map((category) => {
            const items = services.filter((service) => service.categorySlug === category.slug);

            return (
              <Link
                key={category.slug}
                href="/uslugi"
                aria-label={`${category.title} — все услуги и цены`}
                className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Card
                  interactive
                  className="flex h-full items-stretch gap-4 overflow-hidden p-6 sm:p-7"
                >
                  {/* Текст */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="font-display text-xl font-bold text-accent-strong sm:text-2xl">
                      {category.title}
                    </h3>

                    <ul className="mt-3 space-y-1.5">
                      {items.slice(0, 4).map((service) => (
                        <li key={service.slug} className="text-sm text-muted">
                          {service.title}
                        </li>
                      ))}
                    </ul>

                    {/* Круглая кнопка-стрелка снизу */}
                    <span className="mt-auto inline-flex h-11 w-11 items-center justify-center self-start rounded-xl bg-surface text-accent-strong shadow-card ring-1 ring-border transition-transform duration-200 motion-safe:group-hover:translate-x-1">
                      <svg
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>

                  {/* Фото детали — внутри карточки, справа */}
                  <div className="flex w-24 flex-none items-center justify-center sm:w-32">
                    {category.image ? (
                      <Image
                        src={asset(category.image)}
                        alt=""
                        width={220}
                        height={220}
                        sizes="128px"
                        className="h-auto w-full object-contain"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="text-primary/15 [&_svg]:h-16 [&_svg]:w-16"
                      >
                        {categoryIcons[category.slug]}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
