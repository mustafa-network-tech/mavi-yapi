"use client";

import { useMemo, useState, FormEvent } from "react";
import { getProductSelectOptions } from "@/data/products";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { openWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./SectionHeader";

const field =
  "mt-1.5 w-full rounded-lg border border-slate-200/90 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

type Props = { locale: Locale; className?: string; id?: string };

export function OrderForm({ locale, className, id = "teklif" }: Props) {
  const d = getDictionary(locale);
  const options = useMemo(() => getProductSelectOptions(locale), [locale]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [productId, setProductId] = useState<string>("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const productLabel =
      options.find((o) => o.value === productId)?.label || productId || d.form.productPlaceholder;
    const text =
      locale === "tr"
        ? `Merhaba, ${name || "—"}, ${productLabel} hakkında bilgi almak istiyorum. ${message ? `Not: ${message}` : ""} Tel: ${phone || "—"}.`
        : `Hello, I’m ${name || "—"} and I’d like information about ${productLabel}. ${message ? `Note: ${message} ` : ""}Phone: ${phone || "—"}.`;
    if (typeof window !== "undefined") {
      window.location.assign(openWhatsAppUrl(text));
    }
  }

  return (
    <section
      id={id}
      className={cn("border-t border-brand-100/80 py-20 sm:py-24 md:py-28", className)}
      aria-labelledby="form-heading"
    >
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <SectionHeader
          titleId="form-heading"
          title={d.form.title}
          className="text-center sm:text-left"
        />
        <p className="mt-2 text-center text-sm text-slate-500 sm:text-left">
          {locale === "tr"
            ? "Formu doldurduktan sonra WhatsApp üzerinden açılacak pencereye yönlendirilirsiniz."
            : "You’ll be taken to WhatsApp to send your request."}
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_2px_12px_-2px_rgba(10,22,40,0.08)] sm:mt-9 sm:p-7"
        >
          <div>
            <label htmlFor="q-name" className="block text-sm font-medium text-slate-800">
              {d.form.name}
            </label>
            <input
              id="q-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="q-phone" className="block text-sm font-medium text-slate-800">
              {d.form.phone}
            </label>
            <input
              id="q-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={field}
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="q-product" className="block text-sm font-medium text-slate-800">
              {d.form.product}
            </label>
            <select
              id="q-product"
              name="product"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className={field}
            >
              <option value="">{d.form.productPlaceholder}</option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-slate-500">
              {locale === "tr"
                ? "Listede yoksa mesaj alanına ürünü yazın."
                : "If it’s not listed, describe the product in the message."}
            </p>
          </div>
          <div>
            <label htmlFor="q-message" className="block text-sm font-medium text-slate-800">
              {d.form.message}
            </label>
            <textarea
              id="q-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className={field}
            />
          </div>
          <button
            type="submit"
            className="w-full min-h-12 rounded-lg bg-brand-500 py-3.5 text-sm font-semibold text-white shadow-[0_6px_24px_-4px_rgba(249,115,22,0.45)] transition hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg"
          >
            {d.form.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
