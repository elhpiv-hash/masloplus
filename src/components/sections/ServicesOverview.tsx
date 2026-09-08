import type { ReactNode } from "react";
import Link from "next/link";
import { Card, Container, Section } from "@/components/ui";
import { serviceCategories } from "@/content/services";
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

/** Обзор категорий услуг с иконками. Каждая карточка ведёт на /uslugi. */
export function ServicesOverview() {
  return (
    <Section surface="light">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Услуги"
          title="Что мы делаем"
          subtitle="Полный спектр по маслам и техническим жидкостям, а также сопутствующие работы."
          action={{ label: "Все услуги и цены", href: "/uslugi" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href="/uslugi"
              className="group rounded-2xl focus-visible:outline-none"
            >
              <Card
                interactive
                className="h-full p-6 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-accent-strong">
                  {categoryIcons[category.slug]}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{category.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{category.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
