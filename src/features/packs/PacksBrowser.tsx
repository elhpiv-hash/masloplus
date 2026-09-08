"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui";
import type { CarPack } from "@/types/packs";
import { CarPackCard } from "./CarPackCard";

/** Поиск/фильтр наборов по марке и модели + адаптивная сетка карточек. */
export function PacksBrowser({ packs }: { packs: CarPack[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return packs;
    return packs.filter((pack) =>
      `${pack.brand} ${pack.model} ${pack.engine}`.toLowerCase().includes(normalized),
    );
  }, [packs, query]);

  return (
    <div>
      <div className="max-w-md">
        <label htmlFor="pack-search" className="sr-only">
          Поиск по марке и модели
        </label>
        <Input
          id="pack-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск: марка или модель…"
          autoComplete="off"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          По запросу ничего не нашлось. Оставьте заявку ниже — подберём набор под вашу марку.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pack) => (
            <CarPackCard key={pack.slug} pack={pack} />
          ))}
        </div>
      )}
    </div>
  );
}
