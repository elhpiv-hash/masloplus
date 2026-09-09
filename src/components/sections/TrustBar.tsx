import { Container, Section } from "@/components/ui";
import { trustBadges } from "@/content/home";

/**
 * Полоса доверия: ключевые цифры и преимущества сети.
 * На мобиле — компактная строка с горизонтальной прокруткой; на десктопе — сетка.
 */
export function TrustBar() {
  return (
    <Section surface="light" className="py-8 sm:py-12">
      <Container>
        <ul className="flex snap-x gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <li
              key={badge.label}
              className="min-w-[100px] shrink-0 snap-start text-center sm:min-w-0 sm:text-left"
            >
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
