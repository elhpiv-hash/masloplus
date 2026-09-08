import { cn } from "@/lib/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Ограничивает ширину контента и центрирует его.
 * Горизонтальные отступы и максимальная ширина берутся из container-токенов Tailwind.
 */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("container", className)} {...props} />;
}
