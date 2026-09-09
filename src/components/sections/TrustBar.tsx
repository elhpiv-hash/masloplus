import { Container, Section } from "@/components/ui";
import { trustBadges } from "@/content/home";

/** Полоса доверия: ключевые цифры и преимущества сети. */
export function TrustBar() {
  return (
    <Section surface="light" className="py-10 sm:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <li key={badge.label} className="text-center sm:text-left">
              <p className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                {badge.value}
              </p>
              <p className="mt-1 text-sm text-muted">{badge.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
