import { openWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

type Props = { "aria-label": string; className?: string };

export function WhatsAppFloat({ "aria-label": label, className }: Props) {
  return (
    <a
      href={openWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "fixed bottom-5 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25 transition hover:scale-105 hover:shadow-xl",
        className,
      )}
    >
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.1-.198.248-.77.966-.94 1.165-.173.199-.347.224-.644.075-.297-.15-1.255-.464-2.39-1.475-.883-.79-1.48-1.762-1.655-2.06-.174-.299-.02-.46.13-.61.13-.14.3-.35.45-.52.15-.19.2-.32.3-.52.1-.2.05-.36-.02-.5-.08-.15-.67-1.6-.92-2.19-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.35-.27.28-1.04 1.02-1.04 2.49 0 1.48 1.05 2.9 1.2 3.1.15.2 2.1 3.2 5.1 4.5.71.3 1.27.48 1.7.62.7.22 1.35.2 1.86.12.57-.1 1.75-.7 1.99-1.4.25-.7.25-1.3.18-1.4zM12.03 1.5c-5.79 0-10.5 4.71-10.5 10.5 0 1.85.49 3.77 1.4 5.4L1.5 22.5l4.3-1.1c1.5.8 3.1 1.2 4.7 1.2h.01c5.79 0 10.5-4.71 10.5-10.5S17.82 1.5 12.03 1.5Z" />
      </svg>
    </a>
  );
}
