import { Container } from "@/components/ui";

/**
 * Фирменная полоса во всю ширину сразу под геро-баннером: ключевое предложение
 * сети. Без своей кнопки записи — её роль выполняет баннер прямо над полосой
 * (клик по нему открывает онлайн-запись), чтобы не дублировать «Записаться».
 * Синий градиент, жёлтый акцент и диагональные фигуры — узнаваемый стиль сети.
 */
export function QuickBook() {
  return (
    <section className="pb-6 sm:pb-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary-dark to-primary text-white">
        {/* Фирменные акценты */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {/* жёлтая грань слева */}
          <div className="absolute inset-y-0 left-0 w-1.5 bg-accent sm:w-2" />
          {/* диагональная плашка, как на баннерах сети */}
          <div className="absolute -right-24 top-1/2 h-[220%] w-40 -translate-y-1/2 rotate-12 bg-white/[0.05]" />
          <div className="absolute -right-8 top-1/2 h-[220%] w-16 -translate-y-1/2 rotate-12 bg-accent/10" />
          {/* мягкое свечение */}
          <div className="absolute -top-16 right-1/3 h-48 w-48 rounded-full bg-primary-bright/25 blur-3xl" />
        </div>

        <Container className="relative py-6 text-center sm:py-7 sm:text-left">
          <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
            Замена масла в двигателе
          </p>
          <p className="mt-1 text-sm text-white/75 sm:text-base">
            С материалами сети — работа бесплатно · от 15 минут
          </p>
        </Container>
      </div>
    </section>
  );
}
