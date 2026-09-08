import Link from "next/link";
import { Container, buttonVariants } from "@/components/ui";
import { hero } from "@/content/home";

/** Hero главной: сильный оффер и два CTA. Тёмная графитовая секция с мягким акцентным свечением. */
export function Hero() {
  return (
    <section data-surface="dark" className="relative overflow-hidden bg-background">
      {/* Декоративное свечение (не мешает интерактиву и скринридерам). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-accent-700/10 blur-3xl" />
      </div>

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <p className="text-sm font-medium uppercase tracking-wide text-accent-500">
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
