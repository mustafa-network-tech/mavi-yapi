import { WHATSAPP_PHONE } from "@/config/site";

const WA_BASE = `https://wa.me/${WHATSAPP_PHONE}`;

function encode(s: string) {
  return encodeURIComponent(s);
}

export function openWhatsAppUrl(text?: string) {
  if (!text?.trim()) return WA_BASE;
  return `${WA_BASE}?text=${encode(text)}`;
}
