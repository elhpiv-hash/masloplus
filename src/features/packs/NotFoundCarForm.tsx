"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Input, buttonVariants } from "@/components/ui";

/**
 * Блок «Не нашли свою марку»: указываете авто — переносим в форму записи на расчёт.
 * Марка авто не является ПД, поэтому передаём её в query; имя/телефон вводятся уже
 * в защищённой форме на /kontakty (Промт 9). Это не «тупик», как на старом сайте.
 */
export function NotFoundCarForm() {
  const [car, setCar] = useState("");
  const href = car.trim() ? `/kontakty?zapros=${encodeURIComponent(car.trim())}` : "/kontakty";

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold">Не нашли свою марку?</h3>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Укажите марку и модель — подберём набор ТО и рассчитаем стоимость. Останется только оставить
        контакты в форме записи.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Input
          value={car}
          onChange={(event) => setCar(event.target.value)}
          placeholder="Марка и модель, напр. Toyota Camry 2.5"
          aria-label="Марка и модель автомобиля"
          className="sm:flex-1"
        />
        <Link href={href} className={buttonVariants({ variant: "primary" })}>
          Оставить заявку
        </Link>
      </div>
    </Card>
  );
}
