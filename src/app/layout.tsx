import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Основной шрифт с обязательным кириллическим subset (правило проекта).
 * Display-шрифт для заголовков добавим в Промте 3 (дизайн-система).
 */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Масло Плюс — замена масла и ТО в Чебоксарах",
    template: "%s — Масло Плюс",
  },
  description:
    "Сеть автосервисов «Масло Плюс» в Чебоксарах: экспресс-замена масла, ТО, готовые наборы. 3 точки, прозрачные цены.",
  applicationName: "Масло Плюс",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      {/* Header/Footer добавим в Промте 4. */}
      <body>{children}</body>
    </html>
  );
}
