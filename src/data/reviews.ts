import type { Locale } from "@/config/site";

export type ReviewEntry = {
  id: string;
  year: number;
  author: string;
  role: { tr: string; en: string };
  text: { tr: string; en: string };
};

export const reviewEntries: ReviewEntry[] = [
  {
    id: "1",
    year: 1999,
    author: "Ahmet K.",
    role: { tr: "Satın alma, İzmir", en: "Procurement, Izmir" },
    text: {
      tr: "İlk siparişimizde söz verilen tarih tuttu; iade süreci netti. Tedarikçi olarak yanımızda oldular.",
      en: "Our first order was delivered on the promised date; the return process was clear. They stood with us as a vendor.",
    },
  },
  {
    id: "2",
    year: 2003,
    author: "Ebru T.",
    role: { tr: "İK & İSG, Bursa", en: "HR & H&S, Bursa" },
    text: {
      tr: "Eldiven ve PPE tedarikinde fiyat- kalite dengesi dürüst. Acil sevkiyatta çözüm bulduk.",
      en: "Honest price–quality balance on gloves and PPE. We found solutions for urgent deliveries.",
    },
  },
  {
    id: "3",
    year: 2007,
    author: "Murat Ş.",
    role: { tr: "Üretim Müdürü, Kocaeli", en: "Production manager, Kocaeli" },
    text: {
      tr: "Aylık tüketim malzemeleri siparişlerimiz yıllardır gecikmeden gelir; fatura ve evraklar düzenli.",
      en: "Our monthly consumables orders have arrived on time for years; invoices and paperwork are consistent.",
    },
  },
  {
    id: "4",
    year: 2011,
    author: "Sibel D.",
    role: { tr: "Operasyon, Ankara", en: "Operations, Ankara" },
    text: {
      tr: "Farklı kalemler için tek tedarik noktası arıyorduk. Teklif dönüşleri hızlı, iletişim açık.",
      en: "We wanted one point of supply for several items. Fast quotes, open communication.",
    },
  },
  {
    id: "5",
    year: 2015,
    author: "Onur M.",
    role: { tr: "Genel Müdür Yard., İstanbul", en: "Deputy GM, Istanbul" },
    text: {
      tr: "Yeni ürün kalemlerinde stok ve alternatif marka konusunda esnek kaldılar; beklentimizin üzerine çıktılar.",
      en: "With new product lines they stayed flexible on stock and alternates; they exceeded our expectations.",
    },
  },
  {
    id: "6",
    year: 2018,
    author: "Ceren Y.",
    role: { tr: "Satınalma, Antalya", en: "Purchasing, Antalya" },
    text: {
      tr: "Kampanya döneminde hacim artınca bile teslimat planı askıda kalmadı; ekip sakin ve çözümcü.",
      en: "Even when volumes rose in peak season, delivery didn’t fall apart; the team stayed calm and solution-oriented.",
    },
  },
  {
    id: "7",
    year: 2020,
    author: "Hakan B.",
    role: { tr: "Depo, Gaziantep", en: "Warehouse, Gaziantep" },
    text: {
      tr: "Eldiven partileri tutarlı; kalite farkı yaşamadık. WhatsApp hattı iletişimi kısalttı.",
      en: "Glove lots have been consistent; we didn’t see quality swings. WhatsApp shortened coordination.",
    },
  },
  {
    id: "8",
    year: 2022,
    author: "Zeynep A.",
    role: { tr: "İdari İşler, Mersin", en: "Admin, Mersin" },
    text: {
      tr: "Düzenli tedarikçi değerlendirmelerinize katılım sağlandı; geri bildirimimiz aynı hafta dönüştü.",
      en: "We joined your supplier reviews; our feedback was acted on the same week.",
    },
  },
  {
    id: "9",
    year: 2024,
    author: "Burak L.",
    role: { tr: "Tedarik Zinciri, Eskişehir", en: "Supply chain, Eskisehir" },
    text: {
      tr: "Envanter raporlama ihtiyacımızı anlayıp sipariş önerileri sundular; sözleşme maddeleri net.",
      en: "They understood our inventory reporting needs and suggested order patterns; contract terms were clear.",
    },
  },
  {
    id: "10",
    year: 2026,
    author: "Deniz R.",
    role: { tr: "Satın alma, Sakarya", en: "Procurement, Sakarya" },
    text: {
      tr: "Son iki yılda birlikte büyüdük; fiyat artışı dönemlerinde dahi önceden bilgilendirdiler.",
      en: "We’ve grown together the last two years; even in price-increase periods we were informed early.",
    },
  },
];

export function textFor(r: ReviewEntry, locale: Locale) {
  return { body: r.text[locale], role: r.role[locale] };
}
