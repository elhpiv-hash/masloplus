import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import { siteConfig } from "@/content/site";

type LogoProps = {
  className?: string;
  /** "image" — фирменные логотипы (для светлых поверхностей); "text" — словесный знак (для синих). */
  variant?: "image" | "text";
};

const FOCUS =
  "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Логотип. На белой шапке — горизонтальный словесный логотип (одинаково на всех
 * ширинах, по центру на мобиле — см. Header). На синих поверхностях (футер) —
 * текстовый знак, чтобы не было белого прямоугольника.
 */
export function Logo({ className, variant = "image" }: LogoProps) {
  if (variant === "text") {
    return (
      <Link href="/" className={cn("inline-flex items-baseline", FOCUS, className)}>
        <span className="font-display text-lg font-extrabold tracking-tight">
          МАСЛО<span className="text-accent"> ПЛЮС</span>
        </span>
        <span className="sr-only">{siteConfig.brand} — на главную</span>
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("inline-flex items-center", FOCUS, className)}>
      <Image
        src={asset("/brand/logo-full.png")}
        alt={siteConfig.brand}
        width={551}
        height={594}
        priority
        className="h-12 w-auto sm:h-14"
      />
      <span className="sr-only"> — на главную</span>
    </Link>
  );
}
