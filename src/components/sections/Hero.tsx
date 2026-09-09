import Link from "next/link";
import Image from "next/image";
import { Container, buttonVariants } from "@/components/ui";
import { asset } from "@/lib/asset";
import { hero } from "@/content/home";
import { siteConfig } from "@/content/site";

/** Hero главной: сильный оффер, два CTA и крупный фирменный логотип-эмблема. */
export function Hero() {
  return (
    <section data-surface="dark" className="relative overflow-hidden bg-background">
      {/* Декоративное свечение (не мешает интерактиву и скринридерам). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-primary-bright/20 blur-3xl" />
      </div>

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Текстовый блок */}
          <div className="order-last max-w-xl motion-safe:animate-fade-up lg:order-first">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {hero.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={hero.primaryCta.href}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/40 px-6 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* Логотип-эмблема: главный визуальный акцент */}
          <div className="order-first flex justify-center motion-safe:animate-fade-up lg:order-last">
            <div className="relative">
              {/* Мягкое свечение под логотипом, чтобы синий щит не сливался с фоном */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-accent/20 blur-3xl"
              />
              <Image
                src={asset("/brand/logo-full.png")}
                alt={`${siteConfig.brand} — сеть автосервисов в Чебоксарах`}
                width={551}
                height={594}
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 320px, 220px"
                className="h-auto w-56 drop-shadow-2xl sm:w-80 lg:w-[420px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
