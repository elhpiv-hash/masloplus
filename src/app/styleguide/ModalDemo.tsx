"use client";

import { useState } from "react";
import { Button, Checkbox, Input, Modal } from "@/components/ui";

/** Демонстрация модалки для стайлгайда: открытие/закрытие, focus-trap, поля внутри. */
export function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть модалку</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Запись на обслуживание"
        description="Пример модалки: фокус заперт внутри, ESC и клик по фону закрывают."
      >
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <Input placeholder="Ваше имя" aria-label="Имя" />
          <Input placeholder="Телефон" aria-label="Телефон" inputMode="tel" />
          <Checkbox
            required
            label="Согласен на обработку персональных данных"
            aria-label="Согласие на обработку персональных данных"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button type="submit">Отправить</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
