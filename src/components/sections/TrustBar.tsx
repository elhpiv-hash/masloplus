import { Container, Section } from "@/components/ui";
import { trustBadges } from "@/content/home";

/**
 * Полоса доверия: ключевые цифры и преимущества сети.
 * Компактная сетка, полностью помещается на экран (без горизонтальной прокрутки):
 * 2 колонки на мобиле → 3 → 5 на десктопе.
 */
export function TrustBar() {
  return (
    <Section surface="light" className="py-8 sm:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <li key={badge.label} className="text-center sm:text-left">
              <p className="font-display text-lg font-extrabold text-ink sm:text-2xl lg:text-3xl">
                {badge.value}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted sm:mt-1 sm:text-sm">
                {badge.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
