import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Склейка классов Tailwind: clsx собирает условные классы,
 * twMerge разрешает конфликты (побеждает последний), чтобы className извне
 * мог корректно переопределять дефолтные классы компонента.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
