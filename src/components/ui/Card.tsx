import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Добавляет мягкое поднятие при наведении (для кликабельных карточек). */
  interactive?: boolean;
};

/**
 * Карточка на семантической поверхности card. Работает и на светлых, и на тёмных секциях.
 */
export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card text-foreground shadow-card",
        interactive &&
          "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-elevated motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
