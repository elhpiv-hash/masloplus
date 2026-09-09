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
 * Логотип. На белой шапке — фирменные логотипы (wordmark на десктопе, щит на мобиле).
 * На синих поверхностях (футер) — текстовый знак, чтобы не было белого прямоугольника.
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
      {/* Десктоп — горизонтальный словесный логотип */}
      <Image
        src={asset("/brand/logo-wordmark.jpg")}
        alt={siteConfig.brand}
        width={600}
        height={216}
        priority
        className="hidden h-9 w-auto sm:block"
      />
      {/* Мобайл — квадратный щит */}
      <Image
        src={asset("/brand/logo-shield.jpg")}
        alt={siteConfig.brand}
        width={600}
        height={600}
        priority
        className="h-10 w-auto sm:hidden"
      />
      <span className="sr-only"> — на главную</span>
    </Link>
  );
}
