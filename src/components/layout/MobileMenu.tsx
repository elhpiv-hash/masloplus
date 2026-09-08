"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { siteConfig } from "@/content/site";
import { bookingHref, mainNav } from "@/content/navigation";
import { Logo } from "./Logo";
import { Socials } from "./Socials";
import { LocationItem } from "./LocationItem";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Выезжающее мобильное меню. Доступно: focus-trap, ESC, блокировка скролла, aria. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useScrollLock(open);
  useFocusTrap(open, panelRef, onClose);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-graphite-950/60 backdrop-blur-sm motion-safe:animate-fade-in"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Меню сайта"
        data-surface="light"
        className="absolute right-0 top-0 flex h-full w-[min(88vw,360px)] flex-col overflow-y-auto border-l border-border bg-card p-5 shadow-elevated motion-safe:animate-slide-in-right"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>

        <nav aria-label="Основное меню" className="mt-6">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-muted text-accent-600"
                        : "text-foreground hover:bg-muted hover:text-accent-600",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={bookingHref}
          onClick={onClose}
          className={buttonVariants({ variant: "primary", size: "lg", className: "mt-5 w-full" })}
        >
          Записаться
        </Link>

        <div className="mt-6 border-t border-border pt-5">
          <p className="text-sm font-semibold text-foreground">Наши адреса</p>
          <div className="mt-3 flex flex-col gap-4">
            {siteConfig.locations.map((location) => (
              <LocationItem key={location.slug} location={location} showHours />
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <Socials />
        </div>
      </div>
    </div>,
    document.body,
  );
}
