# security-checklist.md — аудит безопасности «Масло Плюс»

Дата аудита: 2026-09-08. Легенда: ✅ выполнено · ⚠️ выполнено с оговоркой · 🔴 задача владельца перед боевым запуском.

---

## 1. Security-заголовки и CSP

Настроены в [`next.config.ts`](../next.config.ts), применяются ко всем маршрутам.

- ✅ `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` (сайт нельзя встроить в чужой iframe)
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- ✅ `X-Powered-By` убран (`poweredByHeader: false`)

**Content-Security-Policy** — строгая база `default-src 'self'` + точечный белый список:

| Директива                  | Значение                                                                | Зачем                                                                   |
| -------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `frame-src`                | vk.com, vkvideo.ru, rutube.ru, yandex.ru, smartcaptcha.yandexcloud.net  | Видео (VK/RuTube), Яндекс.Карты, SmartCaptcha. **YouTube не разрешён.** |
| `img-src`                  | 'self' data: blob: + *.userapi.com, *.vk.com, *.rutube.ru, mc.yandex.ru | Фото галереи (CDN VK/RuTube) + пиксель Метрики                          |
| `script-src`               | 'self' 'unsafe-inline' + smartcaptcha, mc.yandex.ru                     | Метрика, SmartCaptcha                                                   |
| `connect-src`              | 'self' + smartcaptcha, mc.yandex.ru                                     | Бикон Метрики, проверка капчи                                           |
| `object-src`               | 'none'                                                                  | Запрет плагинов                                                         |
| `base-uri` / `form-action` | 'self'                                                                  | Защита от инъекции base/увода форм                                      |

- ⚠️ **`'unsafe-inline'` в `script-src`** — вынужденный компромисс: Next App Router грузит инлайновый bootstrap, JSON-LD и сниппет Метрики инлайном; nonce на статическом экспорте недоступен. Риск снижен тем, что внешний контент санитизируется, а домены ограничены белым списком. **Рекомендация:** при переходе на серверный рантайм (не статический экспорт) внедрить nonce-CSP через middleware и убрать `'unsafe-inline'`.
- ✅ В dev дополнительно `'unsafe-eval'` и `ws:` (HMR) — включаются **только** в режиме разработки, в проде их нет.

## 2. Секреты и переменные окружения

- ✅ Все секреты — только в `.env` (шаблон [`.env.example`](../.env.example)); `.env` в `.gitignore`.
- ✅ Серверные секреты (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `VK_SERVICE_TOKEN`, `VK_COMMUNITY_ID`, `SMARTCAPTCHA_SERVER_KEY`) читаются только в серверных модулях `lib/booking-transport.ts`, `lib/gallery.ts`, `lib/smartcaptcha.ts`.
- ✅ Эти модули помечены `import "server-only"` — сборка **упадёт**, если их случайно импортируют в клиентский компонент (гарантия, что секреты не попадут в бандл).
- ✅ В клиент уходят только реально публичные `NEXT_PUBLIC_*`: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_YANDEX_METRIKA_ID` (+ публичные ключи `NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY`, `NEXT_PUBLIC_YANDEX_MAPS_API_KEY`, публичные по дизайну). Секретов среди `NEXT_PUBLIC_` нет.

## 3. Формы и API

Форма записи → `POST /api/booking` ([route.ts](../src/app/api/booking/route.ts)).

- ✅ **Валидация zod** одной схемой (`features/booking/schema.ts`) и на клиенте, и на сервере.
- ✅ **Rate limiting** эндпоинта (`lib/rate-limit.ts`, 5 запросов/мин на IP). ⚠️ In-memory (на процесс) — для нескольких инстансов заменить на общий store (Redis).
- ✅ **Анти-спам:** honeypot-поле (тихий приём), временная ловушка (<2 с → отказ), опционально Яндекс SmartCaptcha (серверная проверка при наличии ключа).
- ✅ **Ошибки не раскрывают внутренности:** клиенту возвращаются только нейтральные сообщения («Проверьте правильность полей», «Не удалось отправить»); стек/детали не отдаются.

## 4. Персональные данные

- ✅ **Нет ПД в URL/query:** через query передаются только slug'и услуг/наборов и марка авто (не ПД); имя/телефон/комментарий уходят только в теле POST.
- ✅ **Нет ПД в логах:** логируются только статические строки (`[booking] delivery failed` и т. п.) и объекты ошибок рендера; содержимое заявки не логируется.
- ✅ Доставка ПД — только в мессенджер владельца (Telegram), не в сторонние сервисы.

## 5. Зависимости

- ✅ **`npm audit` — 0 уязвимостей.** Найденные уязвимости транзитивного `postcss` (sourceMappingURL path-traversal, XSS в CSS-stringify — только этап сборки) закрыты `overrides: { "postcss": "$postcss" }` на пропатченную линию 8.5.28, **без мажорного апгрейда до Next 16** (сохранён требуемый Next 15).
- ✅ Lockfile (`package-lock.json`) в репозитории.
- ✅ Зависимости минимальны и все используются (runtime: next, react, react-dom, clsx, tailwind-merge, zod, server-only). Неиспользуемых нет.

## 6. Embed и внешний контент

- ✅ Видео-embed разрешены **только с белого списка доменов** (VK Видео, RuTube) — и в CSP `frame-src`, и в коде (`lib/gallery-embed.ts`: `getEmbedUrl` строит URL по провайдеру, `isAllowedEmbedUrl` дополнительно проверяет домен; покрыто юнит-тестами).
- ✅ Внешние подписи из VK/Telegram **санитизируются** перед выводом (`lib/sanitize.ts`: вырезает script/style/теги/контрол-символы; покрыто тестами).

## 7. 152-ФЗ

- ✅ Страница **«Политика обработки персональных данных»** (`/policy`) существует.
- ✅ У формы записи (единственной, отправляющей ПД) — **обязательный чекбокс согласия** со ссылкой на `/policy`; без согласия zod-валидация не пропускает.
- 🔴 **Для боевого запуска:** ПД клиентов должны храниться/обрабатываться на хостинге в РФ. При использовании Vercel — приём и хранение заявок держать на РФ-стороне (свой бот/бэкенд на РФ-хостинге).
- 🔴 Текст Политики ПД — сейчас черновик; утвердить у владельца/юриста (реквизиты оператора, сроки хранения).

---

## Итог

Клиентская и серверная поверхность закрыта: security-заголовки, строгий CSP с белым списком embed, серверная валидация и анти-спам форм, отсутствие ПД в URL/логах, `server-only` на секретных модулях, 0 уязвимостей в зависимостях. Открытые пункты (🔴) — организационные, на стороне владельца перед публикацией (см. также [owner-checklist.md](./owner-checklist.md)).

Единственный технический компромисс — `'unsafe-inline'` в `script-src` (ограничение статического Next App Router); план устранения — nonce-CSP при серверном рантайме.
