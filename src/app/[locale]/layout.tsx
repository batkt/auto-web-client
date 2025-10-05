import type { Metadata } from "next";
import { Geist_Mono, Fira_Sans_Condensed } from "next/font/google";
import "../globals.css";
import "leaflet/dist/leaflet.css";
import { HeaderData, SectionData } from "@/lib/types/data.types";
import { getRequest } from "@/lib/http-client";
import Header from "@/components/header";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";

const shantellSans = Fira_Sans_Condensed({
  variable: "--font-shantell-sans",
  subsets: ["cyrillic-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Монгол Христийн Сүм | Итгэл, Найдвар, Хайр",
    template: "%s | Монгол Христийн Сүм",
  },
  description:
    "Монгол Христийн Сүм - Улаанбаатар дахь бидний нийгэмлэг. Бид итгэл, найдвар, хайрыг түгээж, олон нийтэд үйлчилж байна. Мэргэжлийн сүм, хүүхэд залуучуудын программ, тусламжийн үйлчилгээ.",
  keywords: [
    "Монгол Христийн Сүм",
    "Улаанбаатар сүм",
    "Христийн сүм",
    "Монгол христианууд",
    "сүмийн үйлчилгээ",
    "итгэл найдвар",
    "тусламж",
    "хүүхэд залуучуудын программ",
    "нийгэмлэг",
    "мөргөл",
    "хандив",
    "сайн дурын ажил",
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const headerResponse = await getRequest<SectionData>("/sections/header");
  const headerData = headerResponse.data.data as HeaderData;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${shantellSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster position="top-right" />
          <Header data={headerData} lang={locale} />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
