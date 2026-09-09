"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import { heroSlides } from "@/content/home";

const AUTOPLAY_MS = 5000;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

/**
 * Герой-карусель из фирменных баннеров (content/home → heroSlides).
 * Автопрокрутка (с паузой на наведение и уважением к prefers-reduced-motion),
 * кликабельные стрелки, точки и сами слайды. H1 — скрытый, для SEO/скринридеров.
 */
export function HeroSlider() {
  const count = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused]);

  const arrowClasses =
    "absolute top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/85 p-2 text-primary shadow-card backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex";

  return (
    <section
      aria-roledescription="карусель"
      aria-label="Акции и услуги «Масло Плюс»"
      className="bg-background"
    >
      <h1 className="sr-only">
        Масло Плюс — замена масла и ТО в Чебоксарах: 3 точки, оригинальные масла, экспресс-сервис
      </h1>

      <Container className="py-4 sm:py-6">
        <div
          className="relative overflow-hidden rounded-2xl shadow-card sm:rounded-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Дорожка слайдов */}
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {heroSlides.map((slide, i) => (
              <Link
                key={slide.src}
                href={slide.href}
                aria-label={slide.alt}
                aria-hidden={i !== index}
                tabIndex={i === index ? 0 : -1}
                className="block w-full flex-none rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-3xl"
              >
                <div className="relative aspect-[1280/548]">
                  <Image
                    src={asset(slide.src)}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Предыдущий слайд"
                className={cn(arrowClasses, "left-3")}
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Следующий слайд"
                className={cn(arrowClasses, "right-3")}
              >
                <Chevron dir="right" />
              </button>

              {/* Точки */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4">
                {heroSlides.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Слайд ${i + 1} из ${count}`}
                    aria-current={i === index}
                    className={cn(
                      "h-2.5 rounded-full shadow ring-1 ring-black/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      i === index ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
