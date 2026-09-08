"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types/gallery";
import { Lightbox } from "./Lightbox";

/** Картинка с скелетоном: показывает пульсирующую заглушку, пока фото не загрузится. */
function TileImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Картинка из кэша могла загрузиться до навешивания onLoad — проверяем complete вручную.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && (
        <span className="absolute inset-0 animate-pulse bg-primary/5" aria-hidden="true" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- галерея: ленивые локальные фото без next/image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300 motion-safe:group-hover:scale-105",
          "motion-safe:transition-transform",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}

function PlayOverlay() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary-dark/30">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-dark/70 text-white">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      </span>
    </span>
  );
}

/** Сетка галереи с ленивыми картинками, скелетонами и открытием лайтбокса по клику. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => {
          const label = item.type === "photo" ? item.alt : item.title;
          const thumbSrc = item.type === "photo" ? item.src : item.thumb;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Открыть: ${label}`}
                aria-haspopup="dialog"
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {thumbSrc ? (
                  <TileImage src={thumbSrc} alt={label} />
                ) : (
                  <span className="absolute inset-0 bg-primary-dark" aria-hidden="true" />
                )}
                {item.type === "video" && <PlayOverlay />}
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
