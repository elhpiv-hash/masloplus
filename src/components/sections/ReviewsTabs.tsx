"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { yandexReviewsWidgetSrcById } from "@/content/integrations";
import { LazyEmbed } from "./LazyEmbed";

export type ReviewsLocation = {
  slug: string;
  /** Короткая подпись для вкладки, напр. «Богдана Хмельницкого, 73» */
  label: string;
  /** id организации в Яндекс.Картах */
  widgetId: string;
};

type ReviewsTabsProps = {
  locations: ReviewsLocation[];
};

/**
 * Переключатель отзывов по точкам сети: выбираем адрес — грузим виджет отзывов
 * соответствующей организации Яндекс.Карт. Виджет монтируется лениво (LazyEmbed).
 */
export function ReviewsTabs({ locations }: ReviewsTabsProps) {
  const [activeSlug, setActiveSlug] = useState(locations[0]?.slug);
  const active = locations.find((location) => location.slug === activeSlug) ?? locations[0];

  if (!active) return null;

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="Точки сети" className="flex flex-wrap justify-center gap-2">
        {locations.map((location) => {
          const isActive = location.slug === active.slug;
          return (
            <button
              key={location.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSlug(location.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-foreground hover:border-primary/60",
              )}
            >
              {location.label}
            </button>
          );
        })}
      </div>

      {/* key переинициализирует LazyEmbed при смене точки, чтобы подгрузился нужный виджет */}
      <LazyEmbed
        key={active.slug}
        src={yandexReviewsWidgetSrcById(active.widgetId)}
        title={`Отзывы о Масло Плюс — ${active.label} на Яндекс.Картах`}
        heightClassName="h-[560px]"
        fallback={null}
      />
    </div>
  );
}
