import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium " +
  "transition-[colors,transform] duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "active:scale-[0.98] motion-reduce:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  // primary — жёлтый фон + тёмно-синий текст (главные CTA).
  primary: "bg-accent text-accent-foreground shadow-soft hover:bg-accent-dark",
  // secondary — синий фон + белый текст.
  secondary: "bg-primary text-primary-foreground shadow-soft hover:bg-primary-dark",
  // ghost — синий контур + синий текст.
  ghost: "border border-primary bg-transparent text-primary hover:bg-primary/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

/**
 * Классы кнопки. Вынесены отдельно (без "use client"), чтобы одинаковый вид
 * можно было применить и к <button> (Button), и к <Link>/<a> в серверных компонентах.
 */
export function buttonVariants(options?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  const { variant = "primary", size = "md", className } = options ?? {};
  return cn(base, variants[variant], sizes[size], className);
}
