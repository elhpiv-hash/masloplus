"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import { heroSlides } from "@/content/home";
import { bookingHref } from "@/content/navigation";

/** Автопрокрутка — раз в 30 секунд (листать можно и вручную стрелками/точками). */
const AUTOPLAY_MS = 30000;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={26}
      height={26}
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
 * Герой-карусель во всю ширину экрана из фирменных баннеров (content/home → heroSlides).
 * Автопрокрутка раз в 30 c (пауза на hover, уважает prefers-reduced-motion), кликабельные
 * стрелки и точки на всех размерах, клик по баннеру ведёт на запись. Поверх — пульсирующая
 * кнопка «Записаться», чтобы было понятно, что баннер кликабельный. H1 — скрытый (SEO).
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
  }, [count, paused, index]);

  const arrowClasses =
    "absolute top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white/85 p-2 text-primary shadow-card backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-2.5";

  return (
    <section
      aria-roledescription="карусель"
      aria-label="Акции и услуги «Масло Плюс»"
      className="bg-background"
    >
      <h1 className="sr-only">
        Масло Плюс — замена масла и ТО в Чебоксарах: 3 точки, оригинальные масла, экспресс-сервис
      </h1>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Дорожка слайдов */}
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((slide, i) => (
            <div key={slide.src} className="relative w-full flex-none">
              <div className="relative aspect-[1280/548]">
                <Image
                  src={asset(slide.src)}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              {/* Клик по всему баннеру → запись */}
              <Link
                href={slide.href}
                aria-label={slide.alt}
                aria-hidden={i !== index}
                tabIndex={i === index ? 0 : -1}
                className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ring"
              />
            </div>
          ))}
        </div>

        {/* Пульсирующая кнопка записи (поверх карусели, единая для всех слайдов) */}
        <Link
          href={bookingHref}
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2 font-display text-xs font-bold text-primary-dark shadow-elevated ring-2 ring-white/70 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:animate-cta-bounce sm:bottom-5 sm:right-5 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base"
        >
          Записаться
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Предыдущий слайд"
              className={cn(arrowClasses, "left-2 sm:left-4")}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Следующий слайд"
              className={cn(arrowClasses, "right-2 sm:right-4")}
            >
              <Chevron dir="right" />
            </button>

            {/* Точки */}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-5">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Слайд ${i + 1} из ${count}`}
                  aria-current={i === index}
                  className={cn(
                    "h-2.5 rounded-full shadow ring-1 ring-black/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    i === index ? "w-6 bg-white" : "w-2.5 bg-white/70 hover:bg-white",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
