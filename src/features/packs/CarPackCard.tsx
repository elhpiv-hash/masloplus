"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { Badge, Card, buttonVariants } from "@/components/ui";
import type { CarPack, PackBadge } from "@/types/packs";

const badgeLabels: Record<PackBadge, string> = {
  best: "Лучший выбор",
  "dealer-warranty": "Сохранение гарантии",
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}

/** Карточка набора ТО по авто: переключение тарифов, состав и цена, перенос выбора в запись. */
export function CarPackCard({ pack }: { pack: CarPack }) {
  const defaultIndex = Math.max(
    0,
    pack.tiers.findIndex((tier) => tier.name === "Оптимум"),
  );
  const [tierIndex, setTierIndex] = useState(defaultIndex);
  const tier = pack.tiers[tierIndex];

  const bookingHref = `/kontakty?nabor=${pack.slug}&tarif=${encodeURIComponent(tier.name)}`;

  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold">
            {pack.brand} {pack.model}
          </h3>
          <p className="text-sm text-muted-foreground">
            {pack.engine}
            {pack.years ? ` · ${pack.years}` : ""} · объём {pack.fillVolumeL} л
          </p>
        </div>
        {pack.badges && pack.badges.length > 0 && (
          <div className="flex shrink-0 flex-col items-end gap-1">
            {pack.badges.map((badge) => (
              <Badge key={badge} variant="accent">
                {badgeLabels[badge]}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Тарифы */}
      <div
        role="tablist"
        aria-label="Тариф"
        className="mt-4 inline-flex self-start rounded-xl border border-border bg-muted p-1"
      >
        {pack.tiers.map((option, index) => {
          const active = index === tierIndex;
          return (
            <button
              key={option.name}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTierIndex(index)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      <dl className="mt-4 space-y-1.5 text-sm">
        <DetailRow label="Масло" value={tier.oil} />
        {tier.filters.oil && <DetailRow label="Фильтр масляный" value={tier.filters.oil} />}
        {tier.filters.air && <DetailRow label="Фильтр воздушный" value={tier.filters.air} />}
        {tier.filters.cabin && <DetailRow label="Фильтр салонный" value={tier.filters.cabin} />}
      </dl>

      {tier.freeOilChange && (
        <p className="mt-3 text-xs text-accent-strong">
          Замена масла в ДВС — бесплатно с материалами сети
        </p>
      )}

      <div className="flex-1" />

      <div className="mt-5 flex items-baseline justify-between">
        {tier.totalPrice !== null ? (
          <p>
            <span className="text-sm text-muted-foreground">Цена </span>
            <span className="font-display text-xl font-bold text-foreground">
              {formatPrice(tier.totalPrice)}
            </span>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">По запросу</p>
        )}
      </div>

      <Link
        href={bookingHref}
        className={buttonVariants({ variant: "primary", size: "sm", className: "mt-4 w-full" })}
      >
        Записаться
      </Link>
    </Card>
  );
}
