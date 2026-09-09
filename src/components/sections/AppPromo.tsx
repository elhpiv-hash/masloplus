import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { asset } from "@/lib/asset";
import { siteConfig } from "@/content/site";

/** Преимущества приложения (без бонусной программы — её у сети нет). */
const appPerks = [
  "Онлайн-запись в пару тапов",
  "Услуги, цены и адреса под рукой",
  "Звонок и Telegram — в один тап",
  "История обслуживания вашего авто",
];

const AppleIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.3-.9-2.3-3.7ZM14.1 5.8c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" />
  </svg>
);

const GooglePlayIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M3.6 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l9.1-9.7-9.1-9.7Z" fill="#00D3FF" />
    <path d="m16.3 9.1-3.6-2.1L4.2 2.1c-.2-.1-.4-.2-.6-.2l9 9.6 3.7-2.4Z" fill="#00F076" />
    <path d="m20.5 11-4.2-2.4-3.9 2.5 3.9 2.5 4.2-2.4c.6-.4.6-1.4 0-1.8Z" fill="#FFCE00" />
    <path d="M3.6 21.8c.2 0 .4-.1.6-.2l12-6.9-3.7-2.4-8.9 9.5Z" fill="#FF3C4C" />
  </svg>
);

function StoreButton({
  href,
  eyebrow,
  title,
  icon,
}: {
  href: string;
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-ink shadow-card transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary motion-reduce:hover:translate-y-0"
    >
      <span className="text-ink">{icon}</span>
      <span className="text-left leading-tight">
        <span className="block text-[11px] uppercase tracking-wide text-muted">{eyebrow}</span>
        <span className="block font-display text-base font-bold">{title}</span>
      </span>
    </Link>
  );
}

/** Промо мобильного приложения: фирменная синяя панель + телефон-визуал + кнопки сторов. */
export function AppPromo() {
  const apps = siteConfig.apps;
  if (!apps?.appStore && !apps?.googlePlay) return null;

  return (
    <Section surface="light">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary text-white shadow-elevated">
          {/* фирменное свечение */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-primary-bright/30 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            {/* Текст */}
            <div className="px-6 pt-10 sm:px-10 lg:py-14 lg:pl-12">
              <p className="text-sm font-medium uppercase tracking-wide text-accent">
                Мобильное приложение
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Приложение «Масло&nbsp;Плюс» — сервис в кармане
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Всё о вашем обслуживании в одном приложении: запись онлайн, услуги и цены, адреса
                точек и быстрая связь. Устанавливайте — это бесплатно.
              </p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {appPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-white/90">
                    <svg
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-0.5 flex-none text-accent"
                    >
                      <path d="M5 12.5 10 17l9-10" />
                    </svg>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {apps.appStore && (
                  <StoreButton
                    href={apps.appStore}
                    eyebrow="Загрузите в"
                    title="App Store"
                    icon={AppleIcon}
                  />
                )}
                {apps.googlePlay && (
                  <StoreButton
                    href={apps.googlePlay}
                    eyebrow="Доступно в"
                    title="Google Play"
                    icon={GooglePlayIcon}
                  />
                )}
              </div>
            </div>

            {/* Телефон-визуал */}
            <div className="relative h-[340px] sm:h-[420px] lg:h-[480px]">
              <Image
                src={asset("/app/phone.png")}
                alt="Приложение «Масло Плюс» на смартфоне"
                width={640}
                height={1277}
                sizes="(min-width: 1024px) 320px, 240px"
                className="absolute bottom-0 left-1/2 w-[220px] -translate-x-1/2 drop-shadow-2xl sm:w-[260px] lg:w-[320px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
