import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { getGalleryItems } from "@/lib/gallery";
import { GalleryGrid } from "@/features/gallery";

/** ISR: страница пересобирается не чаще раза в час — свежие посты подтягиваются сами. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Галерея работ и видео",
  description:
    "Свежие работы и видео автосервиса «Масло Плюс» из Telegram и VK. Замена масла, ТО, обслуживание автомобилей в Чебоксарах.",
};

export default async function GalereyaPage() {
  const items = await getGalleryItems();

  return (
    <main>
      <Section surface="dark">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Галерея работ и видео
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Свежие работы и видео сервиса — обновляется автоматически из наших Telegram и VK.
          </p>
        </Container>
      </Section>

      <Section surface="light">
        <Container className="space-y-6">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
              Скоро здесь появятся наши работы. Заглядывайте в наши Telegram и VK — там всё свежее.
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Сейчас показаны примеры — заменятся реальными работами и автоподтяжкой из Telegram и
                VK.
              </p>
              <GalleryGrid items={items} />
            </>
          )}
        </Container>
      </Section>
    </main>
  );
}
