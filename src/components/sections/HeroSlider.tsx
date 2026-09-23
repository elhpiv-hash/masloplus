"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui";
import { asset } from "@/lib/asset";
import { heroSlides } from "@/content/home";

/** Автопрокрутка (только на ПК) — интервал между слайдами. */
const AUTOPLAY_MS = 6000;
/** Минимальный сдвиг пальца, считающийся свайпом. */
const SWIPE_THRESHOLD = 40;

const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Герой-карусель во всю ширину из фирменных баннеров (content/home → heroSlides).
 * Телефон — листается свайпом; ПК — автопрокрутка сама по себе (уважает
 * prefers-reduced-motion). Сам баннер не кликается: кликабельна только кнопка
 * «Записаться», нарисованная на картинке, — поверх неё лежит прозрачная ссылка
 * (координаты в процентах, поэтому совпадает на любой ширине). Снизу точки.
 * H1 скрытый (для SEO/скринридеров).
 */
export function HeroSlider() {
  const count = heroSlides.length;
  const [index, setIndex] = useState(0);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // Автопрокрутка только на десктопе (точный указатель). Без паузы на hover,
  // иначе широкий герой почти всегда «под курсором» и не листается.
  useEffect(() => {
    if (count <= 1) return;
    const mm = window.matchMedia;
    if (!mm) return;
    if (!mm("(hover: hover) and (pointer: fine)").matches) return;
    if (mm("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count]);

  // Свайп на тач-устройствах.
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    swiped.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current !== null && Math.abs(e.touches[0].clientX - startX.current) > 10) {
      swiped.current = true;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <section
      aria-roledescription="карусель"
      aria-label="Акции и услуги «Масло Плюс»"
      className="bg-white"
    >
      <h1 className="sr-only">
        Масло Плюс — замена масла и ТО в Чебоксарах: 3 точки, оригинальные масла, экспресс-сервис
      </h1>

      <Container className="pb-5 sm:pb-8">
        <div
          className="relative touch-pan-y overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Дорожка слайдов */}
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {heroSlides.map((slide, i) => {
              const active = i === index;
              const cta = slide.cta;
              return (
                <div
                  key={slide.src}
                  role="group"
                  aria-roledescription="слайд"
                  aria-label={`${i + 1} из ${count}`}
                  aria-hidden={!active}
                  className="relative w-full flex-none"
                >
                  <div className="relative aspect-[1280/548]">
                    <Image
                      src={asset(slide.src)}
                      alt={slide.alt}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="object-cover"
                    />

                    {/* Кликабельная зона поверх нарисованной кнопки «Записаться» */}
                    {cta && (
                      <a
                        href={cta.href}
                        {...(isExternal(cta.href)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        aria-label={cta.label}
                        tabIndex={active ? 0 : -1}
                        // Не переходить, если это был свайп, а не тап.
                        onClick={(e) => {
                          if (swiped.current) e.preventDefault();
                        }}
                        style={{
                          left: `${cta.area.left}%`,
                          top: `${cta.area.top}%`,
                          width: `${cta.area.width}%`,
                          height: `${cta.area.height}%`,
                        }}
                        className={cn(
                          "absolute z-10 rounded-md transition-[background-color,box-shadow] duration-200",
                          "hover:bg-white/20 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.7)]",
                          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
                          // Кнопка на баннере мелкая на телефоне — расширяем область
                          // нажатия невидимым полем, не меняя внешний вид.
                          "before:absolute before:-inset-3 before:content-['']",
                        )}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Точки-индикаторы (кликабельны) */}
          {count > 1 && (
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
          )}
        </div>
      </Container>
    </section>
  );
}
