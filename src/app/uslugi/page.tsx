import { Container, Section } from "@/components/ui";
import { serviceCategories, services } from "@/content/services";
import { PriceCalculator } from "@/features/price-calculator";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Услуги и цены",
  description:
    "Услуги автосервиса «Масло Плюс» в Чебоксарах с ценами: замена масла в ДВС и трансмиссии, фильтры, доп. работы. Калькулятор стоимости с выбором материалов.",
  path: "/uslugi",
});

export default function UslugiPage() {
  return (
    <main>
      <Section surface="dark">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Услуги и цены
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Выберите нужные услуги и переключатель материалов — стоимость посчитается сразу. Готовый
            выбор можно перенести в запись.
          </p>
        </Container>
      </Section>

      <Section surface="light">
        <Container className="space-y-6">
          {/* Честная пометка: цены предварительные (реальный прайс Чебоксар подтверждает владелец). */}
          <p
            role="note"
            className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-ink"
          >
            Цены указаны предварительно и носят справочный характер. Точную стоимость для вашего
            автомобиля подтвердит мастер при записи.
          </p>

          <PriceCalculator categories={serviceCategories} services={services} />
        </Container>
      </Section>
    </main>
  );
}
