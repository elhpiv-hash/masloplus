import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { galleryPreview } from "@/content/home";
import { getGalleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { SectionHeading } from "./SectionHeading";

function PlayBadge() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary-dark/25 transition-colors group-hover:bg-primary-dark/10">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-dark/70 text-white">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      </span>
    </span>
  );
}

/**
 * Тизер галереи на главной. Показывает 4 свежие работы (в основном видео из
 * Telegram — подтягиваются автоматически, см. lib/gallery.ts), плитки ведут в
 * раздел /galereya. Если контента нет — аккуратные заглушки-иконки.
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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.length > 0
            ? items.map((item) => {
                const label = item.type === "photo" ? item.alt : item.title;
                const thumbSrc = item.type === "photo" ? item.src : item.thumb;
                return (
                  <Link
                    key={item.id}
                    href={galleryPreview.href}
                    aria-label={`Перейти в галерею: ${label}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {thumbSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element -- тизер: ленивые миниатюры без next/image
                      <img
                        src={asset(thumbSrc)}
                        alt={label}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                      />
                    ) : (
                      <span className="absolute inset-0 bg-primary-dark" aria-hidden="true" />
                    )}
                    {item.type === "video" && <PlayBadge />}
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
