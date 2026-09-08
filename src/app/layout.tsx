import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

/** Текстовый гротеск — кириллический subset обязателен (правило проекта). */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

/** Display-шрифт для заголовков — геометрический, «дорогой», с кириллицей. */
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
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
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      {/* Header/Footer добавим в Промте 4. */}
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
