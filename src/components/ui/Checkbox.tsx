"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Подпись рядом с чекбоксом (может содержать ссылку — напр. согласие на обработку ПД). */
  label?: ReactNode;
  /** Класс для внешней обёртки-лейбла. */
  wrapperClassName?: string;
};

const inputClasses = cn(
  "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border border-border bg-background accent-accent-500",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

/** Доступный чекбокс. С подписью — оборачивается в <label> (клик по тексту переключает). */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, wrapperClassName, ...props },
  ref,
) {
  const input = (
    <input ref={ref} type="checkbox" className={cn(inputClasses, className)} {...props} />
  );

  if (!label) return input;

  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2.5 text-sm text-foreground",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
        wrapperClassName,
      )}
    >
      {input}
      <span className="leading-snug">{label}</span>
    </label>
  );
});
