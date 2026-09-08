/** Типы готовых наборов ТО (авто → тарифы → состав). */

export type TierName = "Бюджет" | "Оптимум" | "Премиум";

export type PackBadge = "best" | "dealer-warranty";

export type PackTier = {
  name: TierName;
  /** Масло: бренд + вязкость, напр. "LUKOIL 5w40 Genesis Armotech". */
  oil: string;
  filters: {
    oil?: string;
    air?: string;
    cabin?: string;
  };
  /** Итоговая цена набора, ₽. null → «по запросу». */
  totalPrice: number | null;
  /** Замена масла в ДВС бесплатна при материалах сети. */
  freeOilChange?: boolean;
};

export type CarPack = {
  slug: string;
  brand: string;
  model: string;
  /** Двигатель, напр. "1.6 110 л.с.". */
  engine: string;
  years?: string;
  /** Заправочный объём, л. */
  fillVolumeL: number;
  badges?: PackBadge[];
  /** 2–3 тарифа: Бюджет / Оптимум / Премиум. */
  tiers: PackTier[];
};
