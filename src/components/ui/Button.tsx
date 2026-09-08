"use client";

import { forwardRef } from "react";
import { buttonVariants, type ButtonSize, type ButtonVariant } from "./button-variants";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * Базовая кнопка. Для кнопок-ссылок используйте <Link className={buttonVariants(...)}>
 * из button-variants — так стиль применяется без обязательной клиентской интерактивности.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
});
