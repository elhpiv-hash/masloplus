import Link from "next/link";
import {
  Badge,
  Button,
  buttonVariants,
  Card,
  Checkbox,
  Container,
  Input,
  Section,
  Textarea,
} from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { ModalDemo } from "./ModalDemo";

// Служебная страница — не индексируем.
export const metadata = pageMetadata({
  title: "Styleguide",
  description: "Внутренняя витрина дизайн-системы «Масло Плюс».",
  path: "/styleguide",
  noindex: true,
});

const graphiteScale = [
  "bg-graphite-50",
  "bg-graphite-100",
  "bg-graphite-200",
  "bg-graphite-300",
  "bg-graphite-400",
  "bg-graphite-500",
  "bg-graphite-600",
  "bg-graphite-700",
  "bg-graphite-800",
  "bg-graphite-900",
  "bg-graphite-950",
];

const accentScale = [
  "bg-accent-50",
  "bg-accent-100",
  "bg-accent-200",
  "bg-accent-300",
  "bg-accent-400",
  "bg-accent-500",
  "bg-accent-600",
  "bg-accent-700",
  "bg-accent-800",
  "bg-accent-900",
  "bg-accent-950",
];

function Swatches({ scale }: { scale: string[] }) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
      {scale.map((cls) => (
        <div key={cls} className="space-y-1">
          <div className={`h-12 rounded-lg border border-border ${cls}`} />
          <p className="text-center text-[11px] text-muted-foreground">{cls.replace("bg-", "")}</p>
        </div>
      ))}
    </div>
  );
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-wide text-accent-strong">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main>
      {/* Hero — тёмная секция */}
      <Section surface="dark">
        <Container>
          <Badge variant="accent">Дизайн-система</Badge>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Масло Плюс — UI-kit
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Графитовая база и тёплый янтарный акцент. Одни и те же компоненты аккуратно выглядят и
            на светлых, и на тёмных секциях благодаря семантическим токенам поверхностей.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className={buttonVariants({ variant: "secondary" })}>
              ← На главную
            </Link>
            <Link href="#components" className={buttonVariants({ variant: "primary" })}>
              К компонентам
            </Link>
          </div>
        </Container>
      </Section>

      {/* Палитра */}
      <Section surface="light">
        <Container className="space-y-10">
          <Heading eyebrow="Цвет" title="Палитра" />
          <div className="space-y-2">
            <p className="text-sm font-medium">Графит (нейтраль)</p>
            <Swatches scale={graphiteScale} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Акцент (янтарь)</p>
            <Swatches scale={accentScale} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              data-surface="light"
              className="rounded-2xl border border-border bg-background p-6"
            >
              <p className="font-display font-semibold">Светлая поверхность</p>
              <p className="mt-1 text-sm text-muted-foreground">
                text-foreground / text-muted-foreground / border-border
              </p>
            </div>
            <div data-surface="dark" className="rounded-2xl border border-border bg-background p-6">
              <p className="font-display font-semibold text-foreground">Тёмная поверхность</p>
              <p className="mt-1 text-sm text-muted-foreground">
                те же классы — токены переключаются автоматически
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Типографика */}
      <Section surface="muted">
        <Container className="space-y-6">
          <Heading eyebrow="Шрифты" title="Типографика" />
          <div className="space-y-3">
            <p className="font-display text-4xl font-extrabold tracking-tight">
              Montserrat — заголовки (display)
            </p>
            <p className="font-display text-2xl font-bold">Заголовок второго уровня</p>
            <p className="text-base leading-relaxed">
              Inter — основной текст. Быстрая замена масла и ТО в Чебоксарах: прозрачные цены,
              гарантия на работы и материалы, от 15 минут на замену масла в двигателе.
            </p>
            <p className="text-sm text-muted-foreground">
              Приглушённый текст (muted-foreground) — подписи, пояснения, второстепенная информация.
            </p>
          </div>
        </Container>
      </Section>

      {/* Кнопки */}
      <Section surface="light" id="components">
        <Container className="space-y-8">
          <Heading eyebrow="Компоненты" title="Кнопки" />
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Записаться</Button>
              <Button variant="secondary">Рассчитать</Button>
              <Button variant="ghost">Подробнее</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Link href="#" className={buttonVariants({ variant: "primary" })}>
                Ссылка-кнопка
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Наведение, нажатие (лёгкое сжатие) и фокус с клавиатуры (Tab) — с видимым кольцом.
            </p>
          </div>
        </Container>
      </Section>

      {/* Бейджи и карточки */}
      <Section surface="muted">
        <Container className="space-y-8">
          <Heading eyebrow="Компоненты" title="Бейджи и карточки" />
          <div className="flex flex-wrap gap-3">
            <Badge>Оптимум</Badge>
            <Badge variant="accent">Лучший выбор</Badge>
            <Badge variant="outline">Сохранение гарантии</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-6">
              <p className="font-display font-semibold">Обычная карточка</p>
              <p className="mt-1 text-sm text-muted-foreground">
                bg-card, border-border, тень card.
              </p>
            </Card>
            <Card interactive className="p-6">
              <p className="font-display font-semibold">Интерактивная</p>
              <p className="mt-1 text-sm text-muted-foreground">Поднимается при наведении.</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold">Бюджет</p>
                <Badge variant="accent">от 4 650 ₽</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Пример карточки набора ТО.</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Формы */}
      <Section surface="light">
        <Container className="space-y-8">
          <Heading eyebrow="Компоненты" title="Поля форм" />
          <Card className="max-w-xl space-y-4 p-6">
            <div className="space-y-1.5">
              <label htmlFor="sg-name" className="text-sm font-medium">
                Имя
              </label>
              <Input id="sg-name" placeholder="Иван" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sg-phone" className="text-sm font-medium">
                Телефон (с ошибкой)
              </label>
              <Input id="sg-phone" defaultValue="123" aria-invalid={true} inputMode="tel" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sg-disabled" className="text-sm font-medium">
                Отключённое поле
              </label>
              <Input id="sg-disabled" placeholder="Недоступно" disabled />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sg-comment" className="text-sm font-medium">
                Комментарий
              </label>
              <Textarea id="sg-comment" placeholder="Марка, модель, пожелания…" />
            </div>
            <Checkbox
              label={
                <>
                  Согласен на обработку персональных данных
                  <Link
                    href="/policy"
                    className="ml-1 text-accent-strong underline underline-offset-2"
                  >
                    (политика)
                  </Link>
                </>
              }
            />
          </Card>
        </Container>
      </Section>

      {/* Модалка, радиусы, тени, анимации — тёмная секция */}
      <Section surface="dark">
        <Container className="space-y-10">
          <Heading eyebrow="Компоненты" title="Модалка, радиусы, тени" />

          <div className="space-y-3">
            <p className="text-sm font-medium">Модальное окно</p>
            <ModalDemo />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Радиусы</p>
            <div className="flex flex-wrap gap-4">
              <div className="h-20 w-20 rounded-lg border border-border bg-card" />
              <div className="h-20 w-20 rounded-xl border border-border bg-card" />
              <div className="h-20 w-20 rounded-2xl border border-border bg-card" />
              <div className="h-20 w-20 rounded-3xl border border-border bg-card" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Тени (на светлой карточке)</p>
            <div
              data-surface="light"
              className="flex flex-wrap gap-4 rounded-2xl bg-background p-6"
            >
              <div className="h-20 w-28 rounded-xl bg-card shadow-soft" />
              <div className="h-20 w-28 rounded-xl bg-card shadow-card" />
              <div className="h-20 w-28 rounded-xl bg-card shadow-elevated" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Появление (motion-safe)</p>
            <div className="flex flex-wrap gap-4">
              <div className="h-16 w-16 rounded-xl bg-accent-500 motion-safe:animate-fade-up" />
              <div className="h-16 w-16 rounded-xl bg-accent-500 motion-safe:animate-fade-in" />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
