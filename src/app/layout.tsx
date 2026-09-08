import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { YandexMetrika } from "@/components/seo/YandexMetrika";
import { DEFAULT_TITLE, SITE_NAME } from "@/lib/seo";

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

const description =
  "Сеть автосервисов «Масло Плюс» в Чебоксарах: экспресс-замена масла, ТО, готовые наборы. 3 точки, прозрачные цены.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <OrganizationJsonLd />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <YandexMetrika />
      </body>
    </html>
  );
}
