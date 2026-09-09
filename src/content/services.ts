import type { Service, ServiceCategory } from "@/types/services";

/**
 * Категории услуг (обзор на главной + группировка каталога на /uslugi).
 */
export const serviceCategories: ServiceCategory[] = [
  // Фото деталей — прозрачные PNG в public/services/ (для «Доп. работ» фото пока нет).
  {
    slug: "engine",
    title: "Двигатель",
    description: "Замена масла и масляного фильтра, промывка ДВС, выставление уровня масла.",
    image: "/services/engine.png",
  },
  {
    slug: "transmission",
    title: "Трансмиссия",
    description: "Замена масла в АКПП, МКПП, DSG, CVT, раздатке и дифференциалах.",
    image: "/services/transmission.png",
  },
  {
    slug: "filters",
    title: "Фильтры",
    description: "Замена салонного и воздушного фильтров.",
    image: "/services/filters.png",
  },
  {
    slug: "extra",
    title: "Доп. работы",
    description: "ГУР, тормоза, сцепление, аппаратная замена антифриза и тормозной жидкости.",
  },
];

/**
 * Перечень услуг с ценами (ключевая правка относительно старого сайта — там цен не было).
 *
 * Источник цен на аппаратные/ремонтные работы — ВИТРИНА Яндекс.Карт сети (одинаковая
 * по всем трём точкам, сверено при аудите): замена масла в ДВС — с материалами сети
 * бесплатно; аппаратная АКПП 3000, CVT/DSG/Haldex/антифриз/проточка дисков 2500,
 * колодки 1000, свечи 800, прокладка клапанной крышки — от 1000.
 *
 * 🔴 Остаются ПРЕДВАРИТЕЛЬНЫМИ (нет в витрине, оценка — подтвердить у владельца):
 * промывка ДВС, фильтр без масла, уровень масла, частичная АКПП, МКПП/раздатка,
 * ГУР, тормозная жидкость, фильтры салонный/воздушный, клиентские материалы («свой»).
 *
 * Правит только этот файл — разметку менять не нужно. Цены: number | {from} | null.
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
  {
    slug: "valve-cover-gasket",
    categorySlug: "engine",
    title: "Замена прокладки клапанной крышки",
    note: "Стоимость зависит от модели",
    price: { network: { from: 1000 }, client: { from: 1000 } },
    inCalculator: false,
  },

  // Трансмиссия
  {
    slug: "atf-partial",
    categorySlug: "transmission",
    title: "Замена масла в АКПП (частичная)",
    price: { network: { from: 1200 }, client: { from: 1600 } },
  },
  {
    slug: "atf-hardware",
    categorySlug: "transmission",
    title: "Аппаратная замена масла в АКПП",
    note: "Под давлением, полная замена",
    price: { network: 3000, client: 3000 },
  },
  {
    slug: "cvt-change",
    categorySlug: "transmission",
    title: "Замена масла в вариаторе (CVT)",
    price: { network: 2500, client: 2500 },
  },
  {
    slug: "dsg-change",
    categorySlug: "transmission",
    title: "Замена масла и фильтра в DSG",
    price: { network: 2500, client: 2500 },
  },
  {
    slug: "haldex-change",
    categorySlug: "transmission",
    title: "Замена масла в муфте Haldex",
    price: { network: 2500, client: 2500 },
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
    price: { network: 2500, client: 2500 },
  },
  {
    slug: "brake-disc-turning",
    categorySlug: "extra",
    title: "Проточка тормозных дисков",
    note: "Без снятия, за диск",
    price: { network: 2500, client: 2500 },
  },
  {
    slug: "brake-pads",
    categorySlug: "extra",
    title: "Замена тормозных колодок",
    price: { network: 1000, client: 1000 },
  },
  {
    slug: "spark-plugs",
    categorySlug: "extra",
    title: "Замена свечей зажигания",
    price: { network: 800, client: 800 },
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
