import { Container, Section } from "@/components/ui";
import { trustBadges } from "@/content/home";

/**
 * Полоса доверия: ключевые цифры и преимущества сети — единой строкой-плашкой
 * с разделителями. Все пункты в один ряд на любом экране, без прокрутки
 * (на мобиле — короткие подписи, на десктопе — полные).
 */
export function TrustBar() {
  return (
    <Section surface="light" className="py-8 sm:py-12">
      <Container>
        <ul className="flex items-stretch divide-x divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          {trustBadges.map((badge) => (
            <li key={badge.label} className="flex-1 px-1.5 py-4 text-center sm:px-3 sm:py-6">
              <p className="font-display text-base font-extrabold leading-tight text-ink sm:text-2xl lg:text-3xl">
                {badge.value}
              </p>
              <p className="mt-1 text-[11px] leading-tight text-muted sm:text-sm">
                <span className="sm:hidden">{badge.short}</span>
                <span className="hidden sm:inline">{badge.label}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
