import { pageMetadata } from "@/lib/seo";
import { LocationsJsonLd } from "@/components/seo/JsonLd";
import {
  AppPromo,
  FinalCta,
  GalleryPreview,
  Hero,
  LocationsMap,
  OilsBlock,
  PacksPreview,
  Reviews,
  ServicesOverview,
  TrustBar,
} from "@/components/sections";

export const metadata = pageMetadata({
  description:
    "Сеть автосервисов «Масло Плюс» в Чебоксарах: экспресс-замена масла и ТО, готовые наборы. 3 точки, прозрачные цены, гарантия.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <LocationsJsonLd />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <PacksPreview />
      <OilsBlock />
      <GalleryPreview />
      <AppPromo />
      <Reviews />
      <LocationsMap />
      <FinalCta />
    </main>
  );
}
