import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Услуги и цены",
  description:
    "Услуги автосервиса «Масло Плюс» в Чебоксарах с ценами: замена масла в ДВС и трансмиссии, фильтры, доп. работы. Калькулятор стоимости.",
};

export default function UslugiPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Услуги и цены</h1>
      <p className="mt-4 text-neutral-600">
        Каталог услуг с ценами и калькулятор стоимости соберём в Промте 6.
      </p>
      <Link className="mt-8 inline-block text-blue-700 underline underline-offset-4" href="/">
        ← На главную
      </Link>
    </main>
  );
}
