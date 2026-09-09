import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui";
import { siteConfig } from "@/content/site";

type SocialCardData = {
  name: string;
  handle: string;
  description: string;
  href: string;
  /** Классы фона иконки-чипа (брендовый цвет платформы). */
  chipClassName: string;
  icon: ReactNode;
};

const VkIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
    <path d="M13.16 17.2c-5.02 0-8.16-3.44-8.29-9.16h2.53c.09 4.2 2 5.98 3.47 6.35V8.04h2.4v3.58c1.42-.16 2.9-1.82 3.4-3.58h2.37c-.38 2.16-1.98 3.82-3.12 4.5 1.14.56 2.96 2 3.66 4.66h-2.6c-.55-1.76-1.9-3.12-3.71-3.3v3.3h-.28Z" />
  </svg>
);

const TelegramIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
    <path d="M21.9 4.6 18.9 19c-.2.98-.8 1.22-1.62.76l-4.48-3.3-2.16 2.08c-.24.24-.44.44-.9.44l.32-4.56 8.3-7.5c.36-.32-.08-.5-.56-.18L7.55 13.2 3.13 11.8c-.96-.3-.98-.96.2-1.42L20.66 3.6c.8-.3 1.5.18 1.24 1Z" />
  </svg>
);

const InstagramIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
);

/** Достаёт «@ник» из ссылки соцсети (последний сегмент пути). */
function handleFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, "");
    const last = path.split("/").filter(Boolean).pop() ?? "";
    return last ? `@${last}` : "";
  } catch {
    return "";
  }
}

const ArrowIcon = (
  <svg
    viewBox="0 0 24 24"
    width={18}
    height={18}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="transition-transform duration-200 motion-safe:group-hover:translate-x-1"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Красивые карточки соцсетей для страницы «Контакты». Данные — из site.ts. */
export function SocialCards() {
  const { vk, telegram, instagram } = siteConfig.socials;

  const cards: SocialCardData[] = [
    {
      name: "ВКонтакте",
      handle: handleFromUrl(vk),
      description: "Акции, новинки и фото работ",
      href: vk,
      chipClassName: "bg-[#0077FF]",
      icon: VkIcon,
    },
    {
      name: "Telegram",
      handle: handleFromUrl(telegram),
      description: "Новости и быстрая связь",
      href: telegram,
      chipClassName: "bg-[#26A5E4]",
      icon: TelegramIcon,
    },
    ...(instagram
      ? [
          {
            name: "Instagram",
            handle: handleFromUrl(instagram),
            description: "Фото, сторис и жизнь сервиса",
            href: instagram,
            chipClassName: "bg-[linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)]",
            icon: InstagramIcon,
          } satisfies SocialCardData,
        ]
      : []),
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.name}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${card.name} ${card.handle} — открыть в новой вкладке`}
          className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Card interactive className="flex h-full items-center gap-4 p-5">
            <span
              className={`inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-white shadow-card transition-transform duration-200 motion-safe:group-hover:scale-105 ${card.chipClassName}`}
            >
              {card.icon}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-semibold text-ink">{card.name}</span>
              {card.handle && (
                <span className="block truncate text-sm text-muted">{card.handle}</span>
              )}
              <span className="mt-0.5 block truncate text-sm text-muted">{card.description}</span>
            </span>

            <span className="flex-none text-accent-strong">{ArrowIcon}</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
