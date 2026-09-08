import { cn } from "@/lib/cn";
import { siteConfig } from "@/content/site";

type SocialsProps = {
  className?: string;
  linkClassName?: string;
};

/** Ссылки на соцсети из site.ts. Только VK и Telegram (по правилам проекта). */
export function Socials({ className, linkClassName }: SocialsProps) {
  const { vk, telegram } = siteConfig.socials;

  const linkClasses = cn(
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink transition-colors hover:bg-primary/5 hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    linkClassName,
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a
        href={vk}
        aria-label="Мы во ВКонтакте"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
          <path d="M13.16 17.2c-5.02 0-8.16-3.44-8.29-9.16h2.53c.09 4.2 2 5.98 3.47 6.35V8.04h2.4v3.58c1.42-.16 2.9-1.82 3.4-3.58h2.37c-.38 2.16-1.98 3.82-3.12 4.5 1.14.56 2.96 2 3.66 4.66h-2.6c-.55-1.76-1.9-3.12-3.71-3.3v3.3h-.28Z" />
        </svg>
      </a>
      <a
        href={telegram}
        aria-label="Мы в Telegram"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
          <path d="M21.9 4.6 18.9 19c-.2.98-.8 1.22-1.62.76l-4.48-3.3-2.16 2.08c-.24.24-.44.44-.9.44l.32-4.56 8.3-7.5c.36-.32-.08-.5-.56-.18L7.55 13.2 3.13 11.8c-.96-.3-.98-.96.2-1.42L20.66 3.6c.8-.3 1.5.18 1.24 1Z" />
        </svg>
      </a>
    </div>
  );
}
