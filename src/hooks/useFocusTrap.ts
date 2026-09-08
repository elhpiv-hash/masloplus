"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Запирает фокус внутри контейнера, пока active === true:
 *  - переносит фокус внутрь при активации;
 *  - зацикливает Tab / Shift+Tab по фокусируемым элементам;
 *  - вызывает onEscape по нажатию ESC;
 *  - возвращает фокус на элемент-инициатор при деактивации.
 *
 * onEscape хранится в ref, поэтому эффект не пересоздаётся при смене идентичности колбэка
 * (иначе фокус «прыгал» бы на первый элемент при каждом ре-рендере родителя).
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onEscape: () => void,
): void {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    const restoreFocusTo = document.activeElement as HTMLElement | null;

    const getItems = () =>
      container ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [];

    (getItems()[0] ?? container)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getItems();
      if (items.length === 0) {
        event.preventDefault();
        container?.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const focused = document.activeElement;

      if (event.shiftKey && (focused === first || !container?.contains(focused))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && focused === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusTo?.focus?.();
    };
  }, [active, containerRef]);
}
