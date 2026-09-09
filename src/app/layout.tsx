import type { Metadata, Viewport } from "next";
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

/**
 * Display-шрифт для заголовков — геометрический, «дорогой», с кириллицей.
 * Ключевое: в display-цепочке НЕТ Inter (см. tailwind.config), поэтому до загрузки
 * заголовки рендерятся в size-adjust фолбэке Montserrat (метрики подогнаны под Montserrat),
 * и своп на сам Montserrat идёт почти без сдвига макета (низкий CLS детерминированно).
 */
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e11" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col bg-background text-ink antialiased">
        <OrganizationJsonLd />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Перейти к содержимому
        </a>
        <Header />
        <div id="content" className="flex-1">
          {children}
        </div>
        <Footer />
        <YandexMetrika />
      </body>
    </html>
  );
}
