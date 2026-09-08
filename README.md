# Масло Плюс — сайт сети автосервисов (Чебоксары)

Современный, быстрый и безопасный сайт сети экспресс-замены масла и ТО «Масло Плюс».
Полный редизайн старого сайта на WordPress → **Next.js 15** (App Router, RSC) + TypeScript (strict) + Tailwind CSS.

Документация проекта:

- Правила и стандарты — [`../CLAUDE.md`](../CLAUDE.md)
- Техническое задание — [`docs/spec.md`](docs/spec.md)
- Модель контента — [`docs/content-model.md`](docs/content-model.md)

## Требования

- Node.js `>= 20.9` (рекомендуется LTS, см. [`.nvmrc`](.nvmrc))
- npm

## Установка и запуск

```bash
npm install            # установка зависимостей (заодно поднимет git-хуки Husky)
cp .env.example .env    # создать локальный .env и заполнить значения
npm run dev             # запуск дев-сервера → http://localhost:3000
```

> `.env` в репозиторий **не коммитится**. Клиенту доступны только переменные с префиксом `NEXT_PUBLIC_`.

## Скрипты

| Скрипт                 | Назначение                                 |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Дев-сервер (http://localhost:3000)         |
| `npm run build`        | Продакшн-сборка                            |
| `npm run start`        | Запуск собранного приложения               |
| `npm run lint`         | ESLint (правило проекта: `any` запрещён)   |
| `npm run typecheck`    | Проверка типов TypeScript (`tsc --noEmit`) |
| `npm run format`       | Форматирование Prettier                    |
| `npm run format:check` | Проверка форматирования без изменений      |
| `npm run test`         | Юнит-тесты (Vitest)                        |
| `npm run test:watch`   | Юнит-тесты в watch-режиме                  |

## Структура

```
src/
  app/          # роуты (App Router): /, /uslugi, /nabory, /galereya, /kontakty
                # + not-found (404), error, global-error (500), loading
  components/   # ui / sections / layout
  features/     # фичи с логикой (booking, price-calculator, video-gallery)
  lib/          # утилиты, api-клиенты, zod-схемы
  content/      # контент сайта; site.ts — единый источник NAP
  types/        # общие типы
  hooks/        # переиспользуемые хуки
  styles/       # глобальные стили
docs/           # spec.md, content-model.md
```

## Качество и тулинг

- **ESLint + Prettier** — линт и форматирование.
- **Husky** — pre-commit прогоняет `typecheck + lint + format:check`; commit-msg проверяет **Conventional Commits** через commitlint.
- **Vitest** — юнит-тесты (в первую очередь — логика калькулятора стоимости).

## Безопасность

- Security-заголовки настроены в [`next.config.ts`](next.config.ts): `Content-Security-Policy` (embed разрешены только с белого списка — VK Видео / RuTube; Яндекс добавим позже), `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Секреты — только в `.env` (см. [`.env.example`](.env.example)); токены VK/Telegram используются **только серверно**.
- **152-ФЗ:** формы будут с чекбоксом согласия на обработку ПД; для боевого запуска ПД клиентов должны храниться на хостинге в РФ.

## Галерея — как добавлять работы

Раздел `/galereya` берёт контент из двух источников (данные забираются **серверно**):

1. **Автоматически из VK** (приоритет). Задайте в `.env` `VK_SERVICE_TOKEN` и `VK_COMMUNITY_ID` — сайт сам подтянет последние фото со стены сообщества. Обновление — раз в час (ISR `revalidate = 3600`). Токен клиенту не отдаётся.
2. **Вручную** — список в [`src/content/gallery.ts`](src/content/gallery.ts). Используется, когда авто-подтяжка не настроена.
   - **Фото:** положите файл в `public/gallery/` и добавьте объект `{ id, type: "photo", src: "/gallery/файл.jpg", alt, caption }`.
   - **Видео:** только VK Видео / RuTube (YouTube нельзя). Добавьте `{ id, type: "video", title, video: { provider: "rutube", id: "ID" } }` или `{ provider: "vk", ownerId: "-123", id: "456" }`.

Подписи из VK/Telegram перед выводом **санитизируются**. Домены embed ограничены белым списком в `next.config.ts`.

## Статус

Проект собирается по шагам (см. `PROMPTS.md` в корне рабочего стола). Готовы: каркас и тулинг, дизайн-система, шапка/подвал, главная, услуги с калькулятором, наборы ТО, галерея. Что нужно от заказчика для боевого запуска — в [`docs/owner-checklist.md`](docs/owner-checklist.md).
