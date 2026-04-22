import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { defaultLocale, SITE_NAME } from "@/config/site";
import type { Locale } from "@/config/site";
import { isLocale } from "@/lib/i18n";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fontOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

function localeFromHeader(value: string | null): Locale {
  if (value && isLocale(value)) return value;
  return defaultLocale;
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const h = await headers();
  const htmlLang = localeFromHeader(h.get("x-locale"));
  return (
    <html
      lang={htmlLang}
      className={`${fontSans.variable} ${fontOutfit.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content={SITE_NAME} />
      </head>
      <body
        className={`${fontSans.className} flex min-h-full flex-col overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
