import type { Service, ServiceCategory } from "@/types/services";

/**
 * Категории услуг (обзор на главной + группировка каталога на /uslugi).
 */
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "engine",
    title: "Двигатель",
    description: "Замена масла и масляного фильтра, промывка ДВС, выставление уровня масла.",
    image: "/services/engine.jpg",
  },
  {
    slug: "transmission",
    title: "Трансмиссия",
    description: "Замена масла в АКПП, МКПП, DSG, CVT, раздатке и дифференциалах.",
    image: "/services/transmission.jpg",
  },
  {
    slug: "filters",
    title: "Фильтры",
    description: "Замена салонного и воздушного фильтров.",
    image: "/services/filters.jpg",
  },
  {
    slug: "extra",
    title: "Доп. работы",
    description: "ГУР, тормоза, сцепление, аппаратная замена антифриза и тормозной жидкости.",
    image: "/services/extra.jpg",
  },
];

/**
 * Перечень услуг с ценами (ключевая правка относительно старого сайта — там цен не было).
 *
 * 🔴 ВНИМАНИЕ: цены ПРЕДВАРИТЕЛЬНЫЕ и требуют подтверждения владельца (Чебоксары).
 * Реальный факт со старого сайта: замена масла в ДВС с материалами сети — работа бесплатно.
 * Правит только этот файл — разметку менять не нужно. Цены: number | {from} | null («по запросу»).
 */
export const services: Service[] = [
  // Двигатель
  {
    slug: "oil-change-engine",
    categorySlug: "engine",
    title: "Замена масла и масляного фильтра в ДВС",
    note: "С материалами сети — работа бесплатно",
    price: { network: 0, client: { from: 700 } },
  },
  {
    slug: "engine-flush",
    categorySlug: "engine",
    title: "Промывка двигателя",
    price: { network: 0, client: { from: 900 } },
  },
  {
    slug: "oil-filter-only",
    categorySlug: "engine",
    title: "Замена масляного фильтра без замены масла",
    price: { network: { from: 400 }, client: { from: 600 } },
  },
  {
    slug: "oil-level",
    categorySlug: "engine",
    title: "Выставление уровня масла в ДВС",
    price: { network: { from: 300 }, client: { from: 300 } },
  },

  // Трансмиссия
  {
    slug: "atf-partial",
    categorySlug: "transmission",
    title: "Замена масла в АКПП / CVT (частичная)",
    price: { network: { from: 1200 }, client: { from: 1600 } },
  },
  {
    slug: "atf-hardware",
    categorySlug: "transmission",
    title: "Аппаратная замена масла в АКПП",
    note: "Под давлением, полная замена",
    price: { network: { from: 2500 }, client: { from: 3000 } },
  },
  {
    slug: "mtf-change",
    categorySlug: "transmission",
    title: "Замена масла в МКПП / раздатке / дифференциале",
    price: { network: { from: 800 }, client: { from: 1200 } },
  },

  // Фильтры
  {
    slug: "cabin-filter",
    categorySlug: "filters",
    title: "Замена салонного фильтра",
    price: { network: { from: 400 }, client: { from: 600 } },
  },
  {
    slug: "air-filter",
    categorySlug: "filters",
    title: "Замена воздушного фильтра",
    price: { network: { from: 400 }, client: { from: 600 } },
  },

  // Доп. работы
  {
    slug: "power-steering-fluid",
    categorySlug: "extra",
    title: "Замена жидкости ГУР",
    price: { network: { from: 800 }, client: { from: 1200 } },
  },
  {
    slug: "brake-fluid",
    categorySlug: "extra",
    title: "Аппаратная замена тормозной жидкости",
    note: "Под давлением",
    price: { network: { from: 1200 }, client: { from: 1600 } },
  },
  {
    slug: "antifreeze",
    categorySlug: "extra",
    title: "Аппаратная замена антифриза",
    note: "Под давлением",
    price: { network: { from: 1500 }, client: { from: 2000 } },
  },
  {
    slug: "brake-disc-turning",
    categorySlug: "extra",
    title: "Проточка тормозных дисков",
    note: "Без снятия, за диск",
    price: { network: { from: 1500 }, client: { from: 1500 } },
  },
  {
    slug: "clutch-replacement",
    categorySlug: "extra",
    title: "Замена сцепления",
    note: "Стоимость зависит от модели",
    price: { network: null, client: null },
    inCalculator: false,
  },
];
