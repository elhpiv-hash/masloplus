import Link from "next/link";
import { Container, Section, buttonVariants } from "@/components/ui";
import { finalCta } from "@/content/home";

/** Финальный призыв записаться. */
export function FinalCta() {
  return (
    <Section surface="dark" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-muted">{finalCta.text}</p>
          <Link
            href={finalCta.primary.href}
            className={buttonVariants({ variant: "primary", size: "lg", className: "mt-8" })}
          >
            {finalCta.primary.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
