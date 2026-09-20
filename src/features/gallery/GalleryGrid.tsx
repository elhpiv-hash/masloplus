"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
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
          "h-full w-full object-cover transition-[transform,opacity] duration-500 ease-out motion-safe:group-hover:scale-105",
          "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}

function PlayBadge() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary-dark sm:h-14 sm:w-14">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      </span>
    </span>
  );
}

/** Сетка галереи: вертикальные карточки-«телефоны», скелетоны, подпись и лайтбокс по клику. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
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
                className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-border bg-primary/5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {thumbSrc ? (
                  <TileImage src={asset(thumbSrc)} alt={label} />
                ) : (
                  <span className="absolute inset-0 bg-primary-dark" aria-hidden="true" />
                )}

                {/* Затемнение снизу — чтобы подпись читалась поверх любого кадра. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />

                {item.type === "video" && <PlayBadge />}

                {/* Подпись работы. */}
                <span className="absolute inset-x-0 bottom-0 p-2.5 text-left sm:p-3">
                  <span className="line-clamp-2 text-xs font-medium leading-snug text-white drop-shadow-sm sm:text-sm">
                    {label}
                  </span>
                </span>
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
