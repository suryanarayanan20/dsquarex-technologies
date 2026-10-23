import { site, whatsappHref, mailtoHref } from "../data/site";

/**
 * Enquiry delivery.
 *
 * Primary channel: Web3Forms (https://web3forms.com) — delivers the form to
 * the company inbox with no backend. Its access key is designed to be used
 * in the browser, but Vite inlines it at BUILD time, so it must be set in the
 * hosting provider's environment variables (Vercel → Settings → Environment
 * Variables → VITE_WEB3FORMS_KEY) and the site redeployed.
 *
 * When the key is missing the form does NOT pretend to send. It switches to
 * "continue on WhatsApp" mode, which opens WhatsApp with the message
 * pre-filled so the visitor sends it themselves.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

export const isEmailDeliveryConfigured = Boolean(WEB3FORMS_KEY);

export const initialValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  timeline: "",
  message: "",
  botcheck: "", // honeypot — real visitors never see or fill this
};

export const timelineOptions = ["As soon as possible", "Within 1 month", "1–3 months", "Just exploring"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = "Please tell us your name.";
  const email = v.email.trim();
  const phoneDigits = v.phone.replace(/[^\d]/g, "");
  if (!email && !phoneDigits) {
    errors.email = "Add an email or a phone number so we can reply.";
  } else {
    if (email && !EMAIL_RE.test(email)) errors.email = "That email address doesn't look right.";
    if (v.phone.trim() && (phoneDigits.length < 10 || phoneDigits.length > 13))
      errors.phone = "Enter a 10-digit mobile number (with country code if outside India).";
  }
  if (!v.service) errors.service = "Choose the closest service, or 'Not sure yet'.";
  if (v.message.trim().length < 20)
    errors.message = "A couple of sentences about the project helps us reply properly (20+ characters).";
  return errors;
}

export function composeText(v) {
  const lines = [
    site.greeting,
    ``,
    `Name: ${v.name.trim()}`,
    v.company.trim() ? `Company: ${v.company.trim()}` : null,
    v.email.trim() ? `Email: ${v.email.trim()}` : null,
    v.phone.trim() ? `Phone: ${v.phone.trim()}` : null,
    v.service ? `Service: ${v.service}` : null,
    v.timeline ? `Timeline: ${v.timeline}` : null,
    ``,
    v.message.trim(),
  ];
  return lines.filter((l) => l !== null).join("\n");
}

export const whatsappFor = (v) => whatsappHref(composeText(v));
export const mailtoFor = (v) => mailtoHref(`Project enquiry — ${v.name.trim() || "website"}`, composeText(v));

/**
 * Sends via Web3Forms. Resolves on confirmed delivery only; throws otherwise,
 * so the UI can never show success for a failed request.
 */
export async function sendEnquiry(v) {
  if (!isEmailDeliveryConfigured) throw new Error("not-configured");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New project enquiry — ${v.service} — ${v.name.trim()}`,
        from_name: `${site.name} website`,
        botcheck: v.botcheck,
        name: v.name.trim(),
        email: v.email.trim() || undefined,
        replyto: v.email.trim() || undefined,
        phone: v.phone.trim() || "—",
        company: v.company.trim() || "—",
        service: v.service,
        timeline: v.timeline || "—",
        message: v.message.trim(),
        page: typeof window !== "undefined" ? window.location.href : "",
      }),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success !== true) {
      throw new Error(data.message || `Request failed (${res.status})`);
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}
