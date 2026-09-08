import {
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

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <PacksPreview />
      <OilsBlock />
      <GalleryPreview />
      <Reviews />
      <LocationsMap />
      <FinalCta />
    </main>
  );
}
