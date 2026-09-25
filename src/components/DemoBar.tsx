import type { Locale } from "@/config/site";
import { MK_HOME } from "@/config/site";

const TEXT = {
  tr: {
    label: "Örnek proje",
    long: "Mavi Yapı gerçek bir işletme değildir; MK Digital Systems’in kurumsal tedarik firmaları için hazırladığı bir web sitesi demosudur.",
    short: "MK Digital Systems demosu ↗",
  },
  en: {
    label: "Sample project",
    long: "Mavi Yapı is not a real company; it is a website demo built by MK Digital Systems for B2B supply businesses.",
    short: "MK Digital Systems demo ↗",
  },
} as const;

/** Sample-project notice shared by every MK portfolio demo. Fixed above the sticky header. */
export function DemoBar({ locale }: { locale: Locale }) {
  const t = TEXT[locale];
  return (
    <aside
      aria-label={t.label}
      className="fixed top-0 left-0 right-0 z-[120] flex h-8 items-center gap-3 border-b border-white/10 bg-[#0b1e26] px-4 text-[11px] text-[#c9d5d8] sm:px-6 sm:text-xs"
    >
      <b className="shrink-0 border-r border-white/20 pr-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7b98b]">
        {t.label}
      </b>
      <p className="hidden min-w-0 flex-1 truncate sm:block">{t.long}</p>
      <a href={MK_HOME} className="ml-auto shrink-0 border-b border-white/40 text-white hover:border-[#d7b98b] hover:text-[#d7b98b]">
        <span className="sm:hidden">{t.short}</span>
        <span className="hidden sm:inline">MK Digital Systems ↗</span>
      </a>
    </aside>
  );
}
