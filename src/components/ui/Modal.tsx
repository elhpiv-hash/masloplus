"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Доступная модалка: focus-trap, закрытие по ESC и клику по подложке,
 * блокировка скролла страницы, возврат фокуса на элемент-инициатор.
 * Анимации появления уважают prefers-reduced-motion (глобально в globals.css).
 */
export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => setMounted(true), []);

  useScrollLock(open);
  useFocusTrap(open, dialogRef, onClose);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 motion-safe:animate-fade-in"
      onMouseDown={onClose}
    >
      {/* Подложка */}
      <div className="absolute inset-0 bg-graphite-950/60 backdrop-blur-sm" aria-hidden="true" />
      {/* Панель — data-surface="light" гарантирует читаемость поверх тёмной страницы */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        data-surface="light"
        onMouseDown={(event) => event.stopPropagation()}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card text-foreground shadow-elevated",
          "p-6 focus:outline-none motion-safe:animate-fade-up",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>

        {title && (
          <h2 id={titleId} className="pr-10 font-display text-xl font-bold">
            {title}
          </h2>
        )}
        {description && (
          <p id={descId} className="mt-1.5 text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {children && <div className={cn(title || description ? "mt-4" : "")}>{children}</div>}
      </div>
    </div>,
    document.body,
  );
}
