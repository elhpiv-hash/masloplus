"use client";

import { useEffect } from "react";

/** Блокирует прокрутку страницы, пока active === true (модалки, оверлеи, мобильное меню). */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}
