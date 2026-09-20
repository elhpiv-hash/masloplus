import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { galleryPreview } from "@/content/home";
import { getGalleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { SectionHeading } from "./SectionHeading";

function PlayBadge() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary-dark">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      </span>
    </span>
  );
}

/**
 * Тизер галереи на главной. Показывает 4 свежие работы (в основном видео из
 * Telegram — подтягиваются автоматически, см. lib/gallery.ts), плитки-карточки
 * ведут в раздел /galereya. Если контента нет — аккуратные заглушки-иконки.
 */
export async function GalleryPreview() {
  const items = (await getGalleryItems()).slice(0, 4);

  return (
    <Section surface="light">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={galleryPreview.eyebrow}
          title={galleryPreview.title}
          subtitle={galleryPreview.text}
          action={{ label: "Вся галерея", href: galleryPreview.href }}
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {items.length > 0
            ? items.map((item) => {
                const label = item.type === "photo" ? item.alt : item.title;
                const thumbSrc = item.type === "photo" ? item.src : item.thumb;
                return (
                  <Link
                    key={item.id}
                    href={galleryPreview.href}
                    aria-label={`Перейти в галерею: ${label}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-primary/5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    {thumbSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element -- тизер: ленивые миниатюры без next/image
                      <img
                        src={asset(thumbSrc)}
                        alt={label}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      <span className="absolute inset-0 bg-primary-dark" aria-hidden="true" />
                    )}

                    {/* Затемнение снизу — чтобы подпись читалась поверх любого кадра. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/15 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {item.type === "video" && <PlayBadge />}

                    {/* Подпись работы. */}
                    <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <span className="line-clamp-2 text-sm font-medium leading-snug text-white drop-shadow-sm">
                        {label}
                      </span>
                    </span>
                  </Link>
                );
              })
            : [0, 1, 2, 3].map((index) => (
                <Link
                  key={index}
                  href={galleryPreview.href}
                  aria-label="Перейти в галерею работ и видео"
                  className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface text-muted transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="34"
                    height="34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="8.5" cy="10" r="1.5" />
                    <path d="m4 17 5-4 4 3 3-2 4 3" />
                  </svg>
                </Link>
              ))}
        </div>
      </Container>
    </Section>
  );
}
