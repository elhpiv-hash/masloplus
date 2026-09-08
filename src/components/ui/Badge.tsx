import { cn } from "@/lib/cn";

export type BadgeVariant = "default" | "accent" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: "bg-primary/5 text-muted",
  accent: "bg-accent text-accent-foreground",
  outline: "border border-border text-ink",
};

/** Небольшая метка/пилюля (тарифы, статусы, «Лучший выбор» и т. п.). */
export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
