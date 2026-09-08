import Link from "next/link";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  className?: string;
};

/** Единый заголовок секции: надзаголовок + заголовок + подзаголовок + опциональная ссылка. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-wide text-accent-600">{eyebrow}</p>
          )}
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        {action && (
          <Link href={action.href} className={buttonVariants({ variant: "secondary", size: "sm" })}>
            {action.label}
          </Link>
        )}
      </div>
      {subtitle && <p className="max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
