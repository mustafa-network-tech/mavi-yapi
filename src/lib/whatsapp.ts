import { MK_WHATSAPP_PHONE } from "@/config/site";

const INTRO = "Merhaba MK Digital Systems, Mavi Yapı demo sitesini inceledim.";

/** WhatsApp link to MK Digital Systems with a prefilled message that names this demo. */
export function mkWhatsAppUrl(request = "İşletmem için benzer bir kurumsal web sitesi hakkında görüşmek istiyorum.") {
  return `https://wa.me/${MK_WHATSAPP_PHONE}?text=${encodeURIComponent(`${INTRO} ${request}`)}`;
}
