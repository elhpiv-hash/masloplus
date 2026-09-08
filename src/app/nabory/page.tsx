import { Container, Section } from "@/components/ui";
import { packs } from "@/content/packs";
import { NotFoundCarForm, PacksBrowser } from "@/features/packs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Готовые наборы ТО",
  description:
    "Готовые наборы ТО под ваш автомобиль: тарифы Бюджет, Оптимум и Премиум — масло, фильтры и цена. Поиск по марке. Автосервис «Масло Плюс», Чебоксары.",
  path: "/nabory",
});

export default function NaboryPage() {
  return (
    <main>
      <Section surface="dark">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Готовые наборы ТО
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Масло и фильтры под конкретную модель — выберите тариф Бюджет, Оптимум или Премиум. Не
            нашли свою марку — оставьте заявку, подберём.
          </p>
        </Container>
      </Section>

      <Section surface="light">
        <Container className="space-y-8">
          <p
            role="note"
            className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-4 text-sm text-foreground"
          >
            Составы и цены наборов указаны предварительно и уточняются. Точный набор и стоимость для
            вашего автомобиля подтвердит мастер при записи.
          </p>

          <PacksBrowser packs={packs} />

          <NotFoundCarForm />
        </Container>
      </Section>
    </main>
  );
}
