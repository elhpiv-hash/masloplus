import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Готовые наборы ТО",
  description:
    "Готовые наборы ТО под ваш автомобиль: тарифы Бюджет, Оптимум и Премиум — масло, фильтры и цена. Автосервис «Масло Плюс», Чебоксары.",
};

export default function NaboryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Готовые наборы ТО</h1>
      <p className="mt-4 text-neutral-600">
        Карточки авто с тарифами и поиском по марке соберём в Промте 7.
      </p>
      <Link className="mt-8 inline-block text-blue-700 underline underline-offset-4" href="/">
        ← На главную
      </Link>
    </main>
  );
}
