/** Глобальное состояние загрузки (Suspense fallback уровня корня). */
export default function Loading() {
  return (
    <main
      className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="text-neutral-500">Загрузка…</span>
    </main>
  );
}
