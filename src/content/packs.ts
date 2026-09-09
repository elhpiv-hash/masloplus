import type { CarPack } from "@/types/packs";

/**
 * Готовые наборы ТО. Добавить авто = добавить объект сюда, БЕЗ правки кода.
 *
 * Данные — РЕАЛЬНЫЕ со старого сайта masloplus21.ru (тарифы Бюджет/Премиум):
 *   VW Polo 1.6 (4.2л): 4650 (LUKOIL 5w40 Genesis Armotech + SCT) / 6400 (Shell 5w40 Ultra + MANN)
 *   KIA Rio 1.4/1.6 (3.5л): 3800 (G-Energy 5w30 Far East + MANN) / 5100 (Shell 5w30 Ultra + MANN)
 *   Lada 8 кл. (3.0л): 2900 (G-Energy 5w40 Active + Green Filter) / 4000 (Shell 5w40 HX8 + MANN)
 *
 * На старом сайте у наборов указан только масляный фильтр; воздушный/салонный —
 * правдоподобные значения (уточнить у владельца). Замена масла в ДВС — бесплатно
 * при материалах сети. Больше авто/тарифов добавит владелец.
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
        name: "Премиум",
        oil: "Shell 5w40 Ultra",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 6400,
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
      {
        name: "Бюджет",
        oil: "G-Energy 5w30 Far East",
        filters: { oil: "MANN", air: "Filtron", cabin: "AMD" },
        totalPrice: 3800,
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
    slug: "lada-8kl",
    brand: "Lada",
    model: "8-клапанные (Гранта, Калина, Приора)",
    engine: "8 кл.",
    fillVolumeL: 3.0,
    tiers: [
      {
        name: "Бюджет",
        oil: "G-Energy 5w40 Active",
        filters: { oil: "Green Filter", air: "Nevsky Filter", cabin: "TSN" },
        totalPrice: 2900,
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
];
