import Link from "next/link";
import { Container, Section, buttonVariants } from "@/components/ui";
import { oilsBlock } from "@/content/home";

/** Короткий продающий блок про ассортимент масел. */
export function OilsBlock() {
  return (
    <Section surface="light">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent-600">
              {oilsBlock.eyebrow}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {oilsBlock.title}
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{oilsBlock.text}</p>
            <Link
              href="/uslugi"
              className={buttonVariants({ variant: "secondary", className: "mt-6" })}
            >
              Услуги и цены
            </Link>
          </div>
          <div className="rounded-3xl border border-border bg-muted p-10 text-center">
            <p className="font-display text-6xl font-extrabold text-accent-600">200+</p>
            <p className="mt-2 text-muted-foreground">видов масел и технических жидкостей</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
