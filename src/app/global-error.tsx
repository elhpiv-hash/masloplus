"use client";

import { useEffect } from "react";

/**
 * Глобальная граница ошибок (замена корневого layout при фатальном сбое) — аналог «500».
 * Должна сама рендерить <html>/<body>, т.к. заменяет корневой layout.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ru">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1.5rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <p style={{ fontSize: "3.5rem", fontWeight: 700, margin: 0 }}>500</p>
          <h1 style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Внутренняя ошибка сервера</h1>
          <p style={{ marginTop: "0.5rem", color: "#525252" }}>
            Мы уже разбираемся. Попробуйте обновить страницу.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              borderRadius: "0.375rem",
              background: "#171717",
              color: "#fff",
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Повторить
          </button>
        </main>
      </body>
    </html>
  );
}
