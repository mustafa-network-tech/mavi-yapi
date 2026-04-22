import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/config/site";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { openWhatsAppUrl } from "@/lib/whatsapp";
import { paths } from "@/lib/paths";

const year = new Date().getFullYear();

type Props = { locale: Locale };

export function SiteFooter({ locale }: Props) {
  const d = getDictionary(locale);
  const email = "info@example.com";
  const wa = openWhatsAppUrl();
  return (
    <footer className="border-t border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50 text-slate-700">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-8">
          <div>
            <p className="font-heading text-xl font-bold italic text-ink-900 sm:text-2xl">{SITE_NAME}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">{d.footer.line}</p>
            <a
              href={SITE_URL}
              className="mt-3 inline-block text-sm font-medium text-brand-600 transition hover:text-brand-700"
            >
              {SITE_URL}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-800/80">
              {locale === "tr" ? "İletişim" : "Contact"}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>{d.footer.address}</li>
              <li>
                <a href={`mailto:${email}`} className="text-brand-600 transition hover:underline">
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#25D366] transition hover:underline"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm">
              <Link href={paths.home(locale)} className="text-slate-600 transition hover:text-brand-700">
                {d.nav.home}
              </Link>
              <span className="mx-2 text-slate-300">|</span>
              <Link href={paths.contact(locale)} className="text-slate-600 transition hover:text-brand-700">
                {d.nav.contact}
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-brand-200/60 pt-6 text-center text-xs text-slate-500 sm:pt-8">
          © {year} {SITE_NAME}. {locale === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
