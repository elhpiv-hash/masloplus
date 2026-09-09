import type { CarPack } from "@/types/packs";

/**
 * Готовые наборы ТО. Добавить авто = добавить объект сюда, БЕЗ правки кода.
 *
 * РЕАЛЬНЫЕ данные со старого сайта masloplus21.ru (Бюджет/Премиум, сверено при аудите):
 *   VW Polo 1.6 (4.2л): Бюджет 4650 (LUKOIL 5w40 Genesis Armotech + SCT), Премиум 6400 (Shell 5w40 Ultra + MANN)
 *   KIA Rio 1.4/1.6 (3.5л): Бюджет 3800 (G-Energy 5w30 Far East + MANN), Премиум 5100 (Shell 5w30 Ultra + MANN)
 *   Lada 8 кл. (3.0л): Бюджет 2900 (G-Energy 5w40 Active + Green Filter), Премиум 4000 (Shell 5w40 HX8 + MANN)
 *
 * 🔴 НАШИ ДОБАВЛЕНИЯ (нет на старом сайте — подтвердить/убрать у владельца):
 *   - тариф «Оптимум» у всех авто (у старого сайта было только Бюджет/Премиум);
 *   - авто Skoda Rapid, Hyundai Solaris, Renault Logan (составы/цены — правдоподобные заглушки);
 *   - воздушные/салонные фильтры в наборах (на старом сайте указан только масляный).
 */
export const packs: CarPack[] = [
  {
    slug: "vw-polo-1-6-110",
    brand: "Volkswagen",
    model: "Polo",
    engine: "1.6 110 л.с.",
    fillVolumeL: 4.2,
    badges: ["best"],
    tiers: [
      {
        name: "Бюджет",
        oil: "LUKOIL 5w40 Genesis Armotech",
        filters: { oil: "SCT", air: "Filtron", cabin: "Filtron" },
        totalPrice: 4650,
        freeOilChange: true,
      },
      {
        name: "Оптимум",
        oil: "Mobil Super 5w40",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 5500,
        freeOilChange: true,
      },
      {
        name: "Премиум",
        oil: "Shell 5w40 Ultra",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 6400,
        freeOilChange: true,
      },
    ],
  },
  {
    slug: "skoda-rapid-1-6-110",
    brand: "Skoda",
    model: "Rapid",
    engine: "1.6 110 л.с.",
    fillVolumeL: 4.2,
    tiers: [
      {
        name: "Бюджет",
        oil: "LUKOIL 5w40 Genesis Armotech",
        filters: { oil: "SCT", air: "Filtron", cabin: "Filtron" },
        totalPrice: 4500,
        freeOilChange: true,
      },
      {
        name: "Оптимум",
        oil: "Mobil Super 5w40",
        filters: { oil: "Filtron", air: "Filtron", cabin: "Filtron" },
        totalPrice: 5400,
        freeOilChange: true,
      },
      {
        name: "Премиум",
        oil: "Shell 5w40 Ultra",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 6300,
        freeOilChange: true,
      },
    ],
  },
  {
    slug: "kia-rio",
    brand: "KIA",
    model: "Rio",
    engine: "1.4 / 1.6",
    fillVolumeL: 3.5,
    badges: ["best"],
    tiers: [
      // Бюджет и Премиум — реальные составы/цены со старого сайта masloplus21.ru.
      {
        name: "Бюджет",
        oil: "G-Energy 5w30 Far East",
        filters: { oil: "MANN", air: "Filtron", cabin: "AMD" },
        totalPrice: 3800,
        freeOilChange: true,
      },
      {
        name: "Оптимум",
        oil: "Mobil 5w30",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 4400,
        freeOilChange: true,
      },
      {
        name: "Премиум",
        oil: "Shell 5w30 Ultra",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 5100,
        freeOilChange: true,
      },
    ],
  },
  {
    slug: "hyundai-solaris",
    brand: "Hyundai",
    model: "Solaris",
    engine: "1.4 / 1.6",
    fillVolumeL: 3.5,
    tiers: [
      {
        name: "Бюджет",
        oil: "LUKOIL 5w30 Genesis Special",
        filters: { oil: "Filtron", air: "Filtron", cabin: "AMD" },
        totalPrice: 4200,
        freeOilChange: true,
      },
      {
        name: "Оптимум",
        oil: "Mobil 5w30",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 5000,
        freeOilChange: true,
      },
      {
        name: "Премиум",
        oil: "Shell 5w30 Ultra",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 5800,
        freeOilChange: true,
      },
    ],
  },
  {
    slug: "lada-8kl",
    brand: "Lada",
    model: "8-клапанные (Гранта, Калина, Приора)",
    engine: "8 кл.",
    fillVolumeL: 3.0,
    tiers: [
      // Бюджет и Премиум — реальные составы/цены со старого сайта masloplus21.ru.
      {
        name: "Бюджет",
        oil: "G-Energy 5w40 Active",
        filters: { oil: "Green Filter", air: "Nevsky Filter", cabin: "TSN" },
        totalPrice: 2900,
        freeOilChange: true,
      },
      {
        name: "Оптимум",
        oil: "Rosneft Magnum 5w40",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 3400,
        freeOilChange: true,
      },
      {
        name: "Премиум",
        oil: "Shell 5w40 HX8",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 4000,
        freeOilChange: true,
      },
    ],
  },
  {
    slug: "renault-logan-1-6",
    brand: "Renault",
    model: "Logan",
    engine: "1.6 102 л.с.",
    fillVolumeL: 4.8,
    tiers: [
      {
        name: "Бюджет",
        oil: "ELF Evolution 5w40",
        filters: { oil: "Filtron", air: "Filtron", cabin: "Big Filter" },
        totalPrice: 4300,
        freeOilChange: true,
      },
      {
        name: "Оптимум",
        oil: "Total Quartz 5w40",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 5100,
        freeOilChange: true,
      },
      {
        name: "Премиум",
        oil: "Shell 5w40 Ultra",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 5900,
        freeOilChange: true,
      },
    ],
  },
];
