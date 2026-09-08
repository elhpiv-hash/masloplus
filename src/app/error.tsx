"use client";

import { useEffect } from "react";

/**
 * Границы ошибок на уровне маршрутов. Ловит ошибки рендера сегментов
 * и даёт пользователю возможность повторить попытку.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логируем факт ошибки без персональных данных.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold">Что-то пошло не так</h1>
      <p className="mt-2 text-neutral-600">
        Произошла ошибка при загрузке страницы. Попробуйте ещё раз.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white"
      >
        Повторить
      </button>
    </main>
  );
}
