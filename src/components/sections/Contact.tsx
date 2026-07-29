"use client";

import { useState, FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = t("form.required");
    if (!form.phone.trim()) errs.phone = t("form.required");
    else if (!/^[\d\-+\s]{9,14}$/.test(form.phone.trim())) errs.phone = t("form.phoneInvalid");
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // spam protection

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const serviceOptions = [
    "eyebrowDesign", "eyebrowFill", "threading", "eyebrowColor",
    "brazilianStraighten", "japaneseStraighten", "keratin", "hairTreatment", "other",
  ] as const;

  const whatsappMsg =
    locale === "he" ? BUSINESS_CONFIG.whatsappMessage : BUSINESS_CONFIG.whatsappMessageEn;
  const whatsappHref = `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section id="contact" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-gold-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-500">
            {t("badge")}
          </span>
          <h2 className="font-display mb-3 whitespace-pre-line text-3xl font-bold text-brown-800 md:text-4xl">
            {t("headline")}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          {/* Form */}
          <div className="md:col-span-3">
            <div className="rounded-2xl bg-beige p-6 shadow-sm md:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/20">
                    <svg className="h-8 w-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-brown-800">{t("form.successTitle")}</h3>
                  <p className="text-brown-600">
                    {t("form.successMsg", { name: form.name })}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                  />

                  <div className="grid gap-4">
                    <Field
                      label={t("form.name")}
                      error={errors.name}
                      required
                    >
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass(!!errors.name)}
                        placeholder="ישראלה ישראלי"
                        autoComplete="name"
                      />
                    </Field>

                    <Field
                      label={t("form.phone")}
                      error={errors.phone}
                      required
                    >
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass(!!errors.phone)}
                        placeholder="05X-XXX-XXXX"
                        autoComplete="tel"
                        dir="ltr"
                      />
                    </Field>

                    <Field label={t("form.service")}>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={inputClass(false)}
                      >
                        <option value="">{t("form.serviceOptions.placeholder")}</option>
                        {serviceOptions.map((key) => (
                          <option key={key} value={key}>
                            {t(`form.serviceOptions.${key}`)}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label={t("form.date")}>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className={inputClass(false)}
                        dir="ltr"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </Field>
                  </div>

                  {status === "error" && (
                    <p className="mt-3 text-sm text-red-600">{t("form.errorMsg")}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-6 w-full rounded-full bg-brown-700 py-3.5 font-semibold text-cream shadow-sm transition-all hover:bg-gold-400 hover:text-brown-900 disabled:opacity-60"
                  >
                    {status === "sending" ? t("form.submitting") : t("form.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <InfoCard
              icon={<PhoneIcon />}
              title={t("info.phone")}
            >
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="block font-semibold text-brown-800 hover:text-gold-500"
                dir="ltr"
              >
                {BUSINESS_CONFIG.phone}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </InfoCard>

            <InfoCard icon={<ClockIcon />} title={t("info.hours")}>
              <p className="text-sm text-brown-600">
                {locale === "he" ? BUSINESS_CONFIG.hours.he : BUSINESS_CONFIG.hours.en}
              </p>
            </InfoCard>

            <InfoCard icon={<LocationIcon />} title={t("info.location")}>
              <p className="text-sm text-brown-600">
                {locale === "he" ? BUSINESS_CONFIG.location.address : BUSINESS_CONFIG.location.addressEn}
              </p>
              <a
                href={`https://maps.google.com/?q=${BUSINESS_CONFIG.location.lat},${BUSINESS_CONFIG.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-xs text-gold-500 underline"
              >
                {locale === "he" ? "פתחי ב-Google Maps" : "Open in Google Maps"}
              </a>
            </InfoCard>

            {/* Map embed */}
            <div className="overflow-hidden rounded-xl shadow-sm">
              <iframe
                title={t("mapTitle")}
                src="https://maps.google.com/maps?q=Or+Akiva,Israel&z=14&output=embed"
                width="100%"
                height="200"
                loading="lazy"
                className="border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brown-700">
        {label}
        {required && <span className="ms-1 text-gold-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-beige-dark bg-beige p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brown-200 text-brown-600">
          {icon}
        </div>
        <h3 className="font-semibold text-brown-700">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-3 text-brown-800 outline-none transition-colors focus:ring-2 focus:ring-gold-400/50 ${
    hasError
      ? "border-red-400 bg-red-50"
      : "border-beige-dark bg-cream hover:border-brown-300 focus:border-gold-400"
  }`;
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
