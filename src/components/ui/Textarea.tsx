"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Многострочное поле ввода (комментарий к заявке и т. п.). */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "flex w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-ink",
        "resize-y transition-colors placeholder:text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus-visible:ring-red-500",
        className,
      )}
      {...props}
    />
  );
});
