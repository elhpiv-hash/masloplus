import { Container, Section } from "@/components/ui";
import type { LegalDoc } from "@/content/legal";

/** Единый рендер юридического документа (Политика ПД / Пользовательское соглашение). */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const updated = new Date(doc.updatedAt).toLocaleDateString("ru-RU");

  return (
    <main>
      <Section surface="dark">
        <Container>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Редакция от {updated}</p>
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-muted-foreground">{doc.intro}</p>
            <div className="mt-8 space-y-8">
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-lg font-semibold">{section.heading}</h2>
                  <div className="mt-2 space-y-2 text-muted-foreground">
                    {section.body.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
