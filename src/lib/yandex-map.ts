import type { Location } from "@/types/site";

/**
 * Строит URL iframe-виджета Яндекс.Карт с метками по всем точкам — без API-ключа.
 * Метки и центр берутся из координат точек (site.ts). Если координат нет — undefined.
 * Владелец может переопределить карту готовым URL из конструктора (content/integrations.ts).
 */
export function buildYandexMapUrl(locations: Location[]): string | undefined {
  const withGeo = locations.filter(
    (location): location is Location & { geo: NonNullable<Location["geo"]> } =>
      location.geo != null,
  );
  if (withGeo.length === 0) return undefined;

  const centerLng = withGeo.reduce((sum, l) => sum + l.geo.lng, 0) / withGeo.length;
  const centerLat = withGeo.reduce((sum, l) => sum + l.geo.lat, 0) / withGeo.length;

  const ll = encodeURIComponent(`${centerLng.toFixed(6)},${centerLat.toFixed(6)}`);
  // pm2rdm — красная метка среднего размера. '~' между точками не кодируется.
  const pt = encodeURIComponent(withGeo.map((l) => `${l.geo.lng},${l.geo.lat},pm2rdm`).join("~"));

  return `https://yandex.ru/map-widget/v1/?ll=${ll}&z=11&pt=${pt}`;
}
