/** WhatsApp: ülke kodu + numara, başında + olmadan (örn. 905551112233) */
export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "905365296431";

/** Aynı numara, tel: linki için (E.164) */
export const PHONE_TEL = `+${WHATSAPP_PHONE.replace(/\D/g, "")}`;

/** Görüntü (ör. +90 536 529 64 31) */
export const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? formatTrGsmDisplay(WHATSAPP_PHONE);

function formatTrGsmDisplay(digits: string) {
  const d = digits.replace(/\D/g, "");
  if (d.length < 10) return `+${d}`;
  if (d.startsWith("90") && d.length === 12) {
    return `+90 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}`.trim();
  }
  if (d.length === 10) {
    return `+90 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`.trim();
  }
  return `+${d}`;
}

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@maviyapi.example.com";

export const SITE_NAME = "Mavi Yapı";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maviyapi.example.com";

/** Geçici: tüm ürün/kategori kartları — müşteri görselleri gelince değiştirilecek (public/) */
export const PLACEHOLDER_PRODUCT_IMAGE = "/product-glove.jpg";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";
