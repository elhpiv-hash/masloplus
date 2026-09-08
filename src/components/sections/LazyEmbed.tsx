"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/useInView";

type LazyEmbedProps = {
  /** URL iframe-виджета. Если не задан — показываем fallback (виджет ещё не подключён). */
  src?: string;
  title: string;
  heightClassName?: string;
  fallback: ReactNode;
};

/**
 * Ленивая загрузка тяжёлого стороннего iframe (карта/отзывы Яндекс):
 * монтируется только при появлении в зоне видимости, чтобы не тормозить страницу.
 * Пока src не задан (нет id/ключей и белого списка CSP) — рендерим аккуратный fallback.
 */
export function LazyEmbed({ src, title, heightClassName = "h-[440px]", fallback }: LazyEmbedProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-muted",
        heightClassName,
      )}
    >
      {src ? (
        inView ? (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            className="h-full w-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Загрузка…
          </div>
        )
      ) : (
        <div className="flex h-full items-center justify-center p-6">{fallback}</div>
      )}
    </div>
  );
}
