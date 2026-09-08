"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatMoney, formatPrice } from "@/lib/format";
import { Checkbox, buttonVariants } from "@/components/ui";
import type { Materials, Service, ServiceCategory } from "@/types/services";
import { calculatePrice } from "./calculatePrice";

type PriceCalculatorProps = {
  categories: ServiceCategory[];
  services: Service[];
};

const MATERIALS: { value: Materials; label: string }[] = [
  { value: "network", label: "Материалы сети" },
  { value: "client", label: "Материалы клиента" },
];

/**
 * Интерактивный каталог-калькулятор: выбор услуг чекбоксами + переключатель материалов,
 * живой итог и перенос выбранных услуг в форму записи (без ПД в URL — только slug'и услуг).
 */
export function PriceCalculator({ categories, services }: PriceCalculatorProps) {
  const [materials, setMaterials] = useState<Materials>("network");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (slug: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const selectedServices = useMemo(
    () => services.filter((service) => selected.has(service.slug)),
    [services, selected],
  );
  const result = useMemo(
    () => calculatePrice(selectedServices, materials),
    [selectedServices, materials],
  );

  const bookingHref = useMemo(() => {
    const slugs = selectedServices
      .filter((service) => service.inCalculator !== false)
      .map((service) => service.slug);
    return slugs.length ? `/kontakty?uslugi=${slugs.join(",")}` : "/kontakty";
  }, [selectedServices]);

  return (
    <div id="kalkulyator" className="scroll-mt-28">
      {/* Переключатель материалов */}
      <div
        role="group"
        aria-label="Тип материалов"
        className="inline-flex rounded-xl border border-border bg-muted p-1"
      >
        {MATERIALS.map((option) => {
          const active = materials === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setMaterials(option.value)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-accent-500 text-accent-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Каталог по категориям */}
      <div className="mt-8 space-y-8">
        {categories.map((category) => {
          const items = services.filter((service) => service.categorySlug === category.slug);
          if (items.length === 0) return null;
          return (
            <div key={category.slug}>
              <h3 className="font-display text-lg font-semibold">{category.title}</h3>
              <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {items.map((service) => {
                  const money =
                    materials === "network" ? service.price.network : service.price.client;
                  const selectable = service.inCalculator !== false && money !== null;
                  const checked = selected.has(service.slug);
                  const rowClass =
                    "flex items-center justify-between gap-4 bg-card p-4 transition-colors";

                  const content = (
                    <>
                      <div className="flex items-start gap-3">
                        {selectable ? (
                          <Checkbox
                            checked={checked}
                            onChange={() => toggle(service.slug)}
                            aria-label={service.title}
                          />
                        ) : (
                          <span className="h-5 w-5 shrink-0" aria-hidden="true" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{service.title}</p>
                          {service.note && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{service.note}</p>
                          )}
                        </div>
                      </div>
                      <p className="shrink-0 whitespace-nowrap font-medium text-foreground">
                        {formatMoney(money)}
                      </p>
                    </>
                  );

                  return (
                    <li key={service.slug}>
                      {selectable ? (
                        <label className={cn(rowClass, "cursor-pointer hover:bg-muted")}>
                          {content}
                        </label>
                      ) : (
                        <div className={rowClass}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Итог + запись */}
      <div className="sticky bottom-4 mt-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-elevated sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Выбрано услуг: {result.count}</p>
            <p className="font-display text-2xl font-bold text-foreground" aria-live="polite">
              {result.count === 0
                ? formatPrice(0)
                : `${result.isFrom ? "от " : ""}${formatPrice(result.total)}`}
              {result.hasByRequest && (
                <span className="ml-1 text-sm font-normal text-muted-foreground">+ по запросу</span>
              )}
            </p>
          </div>
          <Link href={bookingHref} className={buttonVariants({ variant: "primary", size: "lg" })}>
            Записаться
          </Link>
        </div>
      </div>
    </div>
  );
}
