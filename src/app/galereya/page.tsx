import { Container, Section } from "@/components/ui";
import { getGalleryItems } from "@/lib/gallery";
import { GalleryGrid } from "@/features/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Галерея работ и видео",
  description:
    "Работы и видео автосервиса «Масло Плюс»: замена масла, ТО и обслуживание автомобилей в Чебоксарах.",
  path: "/galereya",
});

export default async function GalereyaPage() {
  const items = await getGalleryItems();

  return (
    <main>
      <Section surface="dark">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Галерея работ и видео
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Наши работы, оборудование и видео. Показываем, как проходит замена масла и ТО в «Масло
            Плюс».
          </p>
        </Container>
      </Section>

      <Section surface="light">
        <Container className="space-y-6">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-border bg-surface p-10 text-center text-muted">
              Скоро здесь появятся наши работы. Заглядывайте в наши Telegram и VK.
            </p>
          ) : (
            <GalleryGrid items={items} />
          )}
        </Container>
      </Section>
    </main>
  );
}
