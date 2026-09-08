import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/content/site";

/** Логотип: капля масла + словесный знак. Ведёт на главную. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.brand} — на главную`}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        aria-hidden="true"
        className="shrink-0 text-accent-500"
      >
        <path
          fill="currentColor"
          d="M12 2.5c3.6 4.2 6.5 7.9 6.5 11.3A6.5 6.5 0 0 1 12 20.3a6.5 6.5 0 0 1-6.5-6.5C5.5 10.4 8.4 6.7 12 2.5Z"
        />
        <path
          fill="#0c0e11"
          opacity="0.25"
          d="M12 16.8a3 3 0 0 1-3-3c0-.4.3-.7.7-.7s.7.3.7.7a1.6 1.6 0 0 0 1.6 1.6c.4 0 .7.3.7.7s-.3.7-.7.7Z"
        />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
        Масло<span className="text-accent-500">Плюс</span>
      </span>
    </Link>
  );
}
