import { siteConfig } from "@/content/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/** JSON-LD организации (важно для Яндекса). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [siteConfig.socials.vk, siteConfig.socials.telegram],
    contactPoint: siteConfig.locations.map((location) => ({
      "@type": "ContactPoint",
      telephone: location.phones[0]?.tel,
      contactType: "customer service",
      areaServed: "RU",
      availableLanguage: "Russian",
    })),
  };
}

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "09:00",
    closes: "17:00",
  },
];

/** По одному AutoRepair (LocalBusiness) на каждую точку — адрес, гео, телефон, часы. */
export function autoRepairJsonLd() {
  return siteConfig.locations.map((location) => ({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: `${SITE_NAME} — ${location.addressStreet}`,
    url: SITE_URL,
    telephone: location.phones[0]?.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.addressStreet,
      addressLocality: location.city,
      addressCountry: "RU",
    },
    ...(location.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.geo.lat,
            longitude: location.geo.lng,
          },
        }
      : {}),
    openingHoursSpecification: OPENING_HOURS,
    priceRange: "₽₽",
  }));
}
