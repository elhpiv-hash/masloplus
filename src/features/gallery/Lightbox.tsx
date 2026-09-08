"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { getEmbedUrl } from "@/lib/gallery-embed";
import type { GalleryItem } from "@/types/gallery";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

function itemLabel(item: GalleryItem): string {
  return item.type === "photo" ? item.alt : item.title;
}

const controlClasses =
  "inline-flex items-center justify-center rounded-full bg-graphite-900/80 text-graphite-100 transition-colors hover:bg-graphite-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Модалка-лайтбокс: клавиатура (←/→/Esc), focus-trap, блокировка скролла, фото или видео-embed. */
export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const open = index !== null;

  useEffect(() => setMounted(true), []);
  useScrollLock(open);
  useFocusTrap(open, dialogRef, onClose);

  useEffect(() => {
    if (!open || index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexChange((index + 1) % items.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexChange((index - 1 + items.length) % items.length);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, index, items.length, onIndexChange]);

  if (!mounted || index === null) return null;
  const item = items[index];
  const hasMany = items.length > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 motion-safe:animate-fade-in"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-graphite-950/85 backdrop-blur-sm" aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={itemLabel(item)}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
        className="relative z-10 w-full max-w-4xl focus:outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className={cn(controlClasses, "absolute -top-2 right-0 h-10 w-10 sm:-right-2")}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        </button>

        <div className="overflow-hidden rounded-2xl bg-graphite-950">
          {item.type === "photo" ? (
            // eslint-disable-next-line @next/next/no-img-element -- галерея: локальные SVG и удалённые фото VK без next/image
            <img
              src={item.src}
              alt={item.alt}
              className="mx-auto max-h-[80vh] w-auto object-contain"
            />
          ) : (
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(item.video)}
                title={item.title}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
          <p className="text-graphite-200">{item.caption ?? itemLabel(item)}</p>
          {hasMany && (
            <p className="shrink-0 text-graphite-400">
              {index + 1} / {items.length}
            </p>
          )}
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              aria-label="Предыдущее"
              onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
              className={cn(
                controlClasses,
                "absolute left-0 top-1/2 h-11 w-11 -translate-y-1/2 sm:-left-14",
              )}
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Следующее"
              onClick={() => onIndexChange((index + 1) % items.length)}
              className={cn(
                controlClasses,
                "absolute right-0 top-1/2 h-11 w-11 -translate-y-1/2 sm:-right-14",
              )}
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ›
              </span>
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
