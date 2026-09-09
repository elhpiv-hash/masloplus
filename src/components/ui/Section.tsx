import { cn } from "@/lib/cn";

export type SectionSurface = "light" | "muted" | "dark";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Тип поверхности: светлая, приглушённая (мягкий фон) или тёмная графитовая. */
  surface?: SectionSurface;
};

const surfaceClasses: Record<SectionSurface, string> = {
  // light — прозрачная: фон и фирменный водяной знак льва даёт body (layout).
  light: "text-ink",
  muted: "bg-primary/5 text-ink",
  dark: "bg-background text-ink",
};

/**
 * Секция страницы с вертикальным ритмом и типом поверхности.
 * data-surface переключает семантические токены внутри секции,
 * поэтому вложенные компоненты (Card, тексты, границы) адаптируются автоматически.
 */
export function Section({ surface = "light", className, children, ...props }: SectionProps) {
  const dataSurface = surface === "dark" ? "dark" : "light";
  return (
    <section
      data-surface={dataSurface}
      className={cn("py-14 sm:py-16 lg:py-20", surfaceClasses[surface], className)}
      {...props}
    >
      {children}
    </section>
  );
}
