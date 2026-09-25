/**
 * Portföy demosu: Mavi Yapı gerçek bir işletme değildir.
 * Etkileşimler çalışır ama hiçbiri kurgusal firmaya ulaşmaz: WhatsApp aksiyonları, demo adını içeren
 * hazır mesajla MK Digital Systems'e gider; e-posta tıklanamaz örnek değerdir, teklif formu veri göndermez.
 */
// Yeni domain yayına girince https://mk-digitalsystems.com olarak değiştirin.
export const MK_HOME = "https://mk-digital-systems-seven.vercel.app/tr";
export const MK_WHATSAPP_PHONE = "905456597551";

export const CONTACT_EMAIL = "info@mavi-yapi.example";

export const SITE_NAME = "Mavi Yapı";

/** Geçici: tüm ürün/kategori kartları — müşteri görselleri gelince değiştirilecek (public/) */
export const PLACEHOLDER_PRODUCT_IMAGE = "/product-glove.jpg";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";
