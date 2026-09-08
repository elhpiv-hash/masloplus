import { Suspense } from "react";
import Link from "next/link";
import { Card, Container, Section, buttonVariants } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { LocationItem } from "@/components/layout/LocationItem";
import { LocationsMap } from "@/components/sections";
import { LocationsJsonLd } from "@/components/seo/JsonLd";
import { BookingForm } from "@/features/booking";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Контакты",
  description:
    "Контакты автосервиса «Масло Плюс» в Чебоксарах: 3 точки, адреса, телефоны, график работы, карта. Онлайн-запись.",
  path: "/kontakty",
});

export default function KontaktyPage() {
  return (
    <main>
      <LocationsJsonLd />
      <Section surface="dark">
        <Container>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Контакты
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Три точки в Чебоксарах. Запишитесь онлайн — перезвоним и подтвердим удобное время.
          </p>
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Наши точки</h2>
              <div className="mt-6 space-y-4">
                {siteConfig.locations.map((location) => (
                  <Card key={location.slug} className="p-5">
                    <LocationItem location={location} showHours />
                    {location.maps.gis2 && (
                      <Link
                        href={location.maps.gis2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "secondary",
                          size: "sm",
                          className: "mt-4",
                        })}
                      >
                        Открыть в 2ГИС
                      </Link>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Suspense
                fallback={
                  <Card className="p-6 sm:p-8">
                    <p className="text-muted-foreground">Загрузка формы…</p>
                  </Card>
                }
              >
                <BookingForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>

      <LocationsMap />
    </main>
  );
}
