"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Container, buttonVariants } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { bookingHref, mainNav } from "@/content/navigation";
import { Logo } from "./Logo";
import { Socials } from "./Socials";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="bg-background/90 sticky top-0 z-40 border-b border-border backdrop-blur">
      {/* Верхняя полоса: 3 адреса с телефонами. Скрыта на мобильных, сворачивается при скролле. */}
      <div
        className={cn(
          "hidden overflow-hidden border-border transition-all duration-300 lg:block",
          scrolled ? "max-h-0 border-b-0 opacity-0" : "max-h-20 border-b opacity-100",
        )}
      >
        <Container className="flex items-center justify-between gap-6 py-2">
          <ul className="flex items-center gap-6">
            {siteConfig.locations.map((location) => (
              <li key={location.slug} className="text-xs leading-tight">
                <span className="text-foreground">{location.addressStreet}</span>
                <span className="ml-2 inline-flex gap-2">
                  {location.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="rounded text-muted-foreground transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {phone.display}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <Socials />
        </Container>
      </div>

      {/* Основная полоса */}
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <Logo />

        <nav aria-label="Основное меню" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "text-accent-strong"
                        : "text-foreground hover:bg-muted hover:text-accent-strong",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={bookingHref}
            className={buttonVariants({ variant: "primary", className: "hidden sm:inline-flex" })}
          >
            Записаться
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
