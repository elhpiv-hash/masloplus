import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { galleryPreview } from "@/content/home";
import { SectionHeading } from "./SectionHeading";

/**
 * Тизер галереи. Реальные фото/видео из Telegram/VK подтянем в Промте 8 —
 * здесь пока плитки-заглушки со ссылкой на раздел.
 */
const tiles = [
  { kind: "video" as const },
  { kind: "photo" as const },
  { kind: "photo" as const },
  { kind: "video" as const },
];

export function GalleryPreview() {
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
          {tiles.map((tile, index) => (
            <Link
              key={index}
              href={galleryPreview.href}
              aria-label="Перейти в галерею работ и видео"
              className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface text-muted transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {tile.kind === "video" ? (
                <svg
                  viewBox="0 0 24 24"
                  width="34"
                  height="34"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7L8 5Z" />
                </svg>
              ) : (
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
              )}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
