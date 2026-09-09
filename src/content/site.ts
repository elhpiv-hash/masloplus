import type { SiteConfig, WorkingHours } from "@/types/site";

/**
 * ЕДИНСТВЕННЫЙ источник правды для NAP (адреса/телефоны/график/соцсети).
 * Используется в Header, Footer, /kontakty, картах и JSON-LD.
 * Данные — со старого сайта masloplus21.ru, приведены к единому формату.
 *
 * ВАЖНО (расхождения старого сайта, требуют подтверждения владельца):
 *  - Университетская: на главной было «35Г», на «Услугах»/«Контактах» — «35А».
 *    Ниже поставлено «35» с пометкой TODO — подтвердить точный дом.
 *  - Координаты geo взяты из ссылок 2ГИС (приблизительные) — уточнить.
 */

const HOURS: WorkingHours = {
  weekdays: "Пн–Пт 9:00–19:00",
  weekend: "Сб–Вс 9:00–17:00",
};

export const siteConfig: SiteConfig = {
  brand: "Масло Плюс",
  org: {
    brand: "Масло Плюс",
    // legalName / inn / ogrn / email — уточнить у владельца (нужно для подвала и JSON-LD).
  },
  socials: {
    vk: "https://vk.com/masloplus21",
    telegram: "https://t.me/masloplus",
    instagram: "https://www.instagram.com/masloplus21",
  },
  apps: {
    appStore: "https://apps.apple.com/ru/app/id6755126334",
    googlePlay: "https://play.google.com/store/apps/details?id=ru.maslo.plus",
  },
  locations: [
    {
      slug: "l-komsomola-29",
      title: "Масло Плюс на Ленинского комсомола",
      addressStreet: "ул. Ленинского комсомола, 29",
      city: "Чебоксары",
      phones: [
        { display: "+7 (8352) 24-24-11", tel: "+78352242411" },
        { display: "+7 909 300-10-60", tel: "+79093001060" },
      ],
      hours: HOURS,
      geo: { lat: 56.108767, lng: 47.294516 },
      maps: {
        gis2: "https://2gis.ru/cheboksary/firm/70000001017325085",
      },
      reviewsWidgetId: "214501904406",
    },
    {
      slug: "b-hmelnitskogo-73",
      title: "Масло Плюс на Богдана Хмельницкого",
      addressStreet: "ул. Богдана Хмельницкого, 73",
      city: "Чебоксары",
      phones: [
        { display: "+7 (8352) 386-383", tel: "+78352386383" },
        { display: "+7 927 668-63-83", tel: "+79276686383" },
      ],
      hours: HOURS,
      geo: { lat: 56.121317, lng: 47.226973 },
      maps: {
        gis2: "https://2gis.ru/cheboksary/firm/70000001024154989",
      },
      reviewsWidgetId: "76666692601",
    },
    {
      slug: "universitetskaya-35",
      // Дом 35А — подтверждён рекламным баннером сети (ул. Университетская, 35А).
      title: "Масло Плюс на Университетской",
      addressStreet: "ул. Университетская, 35А",
      city: "Чебоксары",
      phones: [
        { display: "+7 (8352) 21-22-88", tel: "+78352212288" },
        { display: "+7 909 300-10-03", tel: "+79093001003" },
      ],
      hours: HOURS,
      geo: { lat: 56.134893, lng: 47.164752 },
      maps: {
        gis2: "https://2gis.ru/cheboksary/firm/70000001099177473",
      },
      reviewsWidgetId: "89882408027",
    },
  ],
};
