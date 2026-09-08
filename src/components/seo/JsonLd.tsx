import { autoRepairJsonLd, organizationJsonLd } from "@/lib/json-ld";

/** Безопасно сериализует JSON-LD (экранирует '<', чтобы нельзя было закрыть тег). */
function serialize(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
  );
}

/** Организация — рендерим один раз (в layout). */
export function OrganizationJsonLd() {
  return <JsonLd data={organizationJsonLd()} />;
}

/** Точки (AutoRepair) — на страницах, где это уместно (главная, контакты). */
export function LocationsJsonLd() {
  return (
    <>
      {autoRepairJsonLd().map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
    </>
  );
}
