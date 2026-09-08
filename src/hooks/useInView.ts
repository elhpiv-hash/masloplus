"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Сообщает, попал ли элемент в область видимости (одноразово).
 * Используется для ленивой подгрузки тяжёлых сторонних виджетов (карты, отзывы).
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { rootMargin: "200px" },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, options]);

  return { ref, inView };
}
