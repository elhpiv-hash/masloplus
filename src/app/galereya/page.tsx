import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Галерея работ и видео",
  description:
    "Свежие работы и видео автосервиса «Масло Плюс» из Telegram и VK. Замена масла, ТО, обслуживание автомобилей в Чебоксарах.",
};

export default function GalereyaPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Галерея работ и видео</h1>
      <p className="mt-4 text-neutral-600">
        Живую сетку работ и видео из Telegram/VK соберём в Промте 8.
      </p>
      <Link className="mt-8 inline-block text-blue-700 underline underline-offset-4" href="/">
        ← На главную
      </Link>
    </main>
  );
}
