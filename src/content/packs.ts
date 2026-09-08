import type { CarPack } from "@/types/packs";

/**
 * Готовые наборы ТО. Добавить авто = добавить объект сюда, БЕЗ правки кода.
 *
 * 🔴 ВНИМАНИЕ: составы и цены — ПРЕДВАРИТЕЛЬНЫЕ, требуют подтверждения владельца
 * (см. docs/owner-checklist.md, п.9–10). Реальные значения (со старого сайта):
 * VW Polo — Бюджет 4650 ₽ (LUKOIL 5w40 Genesis Armotech, фильтр SCT) и
 * Премиум 6400 ₽ (Shell 5w40 Ultra, фильтр MANN). Остальное — правдоподобные заглушки.
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
    slug: "lada-vesta-1-6",
    brand: "Lada",
    model: "Vesta",
    engine: "1.6 106 л.с.",
    fillVolumeL: 4.4,
    tiers: [
      {
        name: "Бюджет",
        oil: "LUKOIL 5w40 Genesis Armotech",
        filters: { oil: "Nevsky Filter", air: "Nevsky Filter", cabin: "TSN" },
        totalPrice: 3900,
        freeOilChange: true,
      },
      {
        name: "Оптимум",
        oil: "Rosneft Magnum 5w40",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 4600,
        freeOilChange: true,
      },
      {
        name: "Премиум",
        oil: "Shell 5w40 Ultra",
        filters: { oil: "MANN", air: "MANN", cabin: "MANN" },
        totalPrice: 5400,
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
