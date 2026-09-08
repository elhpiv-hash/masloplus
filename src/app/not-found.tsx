import Link from "next/link";

/** Кастомная страница 404. */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-bold tracking-tight">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Страница не найдена</h1>
      <p className="mt-2 text-neutral-600">
        Возможно, ссылка устарела или страница была перемещена.
      </p>
      <Link
        className="mt-8 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white"
        href="/"
      >
        Вернуться на главную
      </Link>
    </main>
  );
}
