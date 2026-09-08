import type { ServiceCategory } from "@/types/services";

/**
 * Категории услуг (обзор на главной + основа для каталога в Промте 6).
 * Полный перечень услуг с ценами и калькулятор — в Промте 6.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "engine",
    title: "Двигатель",
    description: "Замена масла и масляного фильтра, промывка ДВС, выставление уровня масла.",
  },
  {
    slug: "transmission",
    title: "Трансмиссия",
    description: "Замена масла в АКПП, МКПП, DSG, CVT, раздатке и дифференциалах.",
  },
  {
    slug: "filters",
    title: "Фильтры",
    description: "Замена салонного и воздушного фильтров.",
  },
  {
    slug: "extra",
    title: "Доп. работы",
    description: "ГУР, тормоза, сцепление, аппаратная замена антифриза и тормозной жидкости.",
  },
];
