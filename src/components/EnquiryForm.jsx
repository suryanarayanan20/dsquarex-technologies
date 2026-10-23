import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { serviceOptions } from "../data/site";
import { getProject } from "../data/projects";
import {
  initialValues,
  timelineOptions,
  validate,
  sendEnquiry,
  isEmailDeliveryConfigured,
  whatsappFor,
  mailtoFor,
} from "../lib/enquiry";

function Field({ id, label, optional, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-[var(--ink)]">
        {label}
        {optional && <span className="mono text-[11px] text-[var(--muted)] font-normal">optional</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-[var(--muted)] mt-1.5">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-[#ff9b85] mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

function EnquiryForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed | handed-off
  const [failure, setFailure] = useState("");
  const statusRef = useRef(null);
  const formRef = useRef(null);

  // "Start a similar project" links from case studies pre-fill the form
  useEffect(() => {
    const p = getProject(params.get("project") || "");
    if (!p) return;
    setValues((v) =>
      v.message
        ? v
        : {
            ...v,
            service: p.categories.includes("AI integration")
              ? "AI integration"
              : p.categories.includes("Web application")
              ? "Custom web application"
              : "Business website",
            message: `I'd like something similar to the ${p.title} project. `,
          }
    );
  }, [params]);

  useEffect(() => {
    if (status !== "idle" && status !== "sending") statusRef.current?.focus();
  }, [status]);

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    if (values.botcheck) return; // bot — silently ignore

    if (!isEmailDeliveryConfigured) {
      // No delivery service configured: hand over to WhatsApp with the message pre-filled.
      window.open(whatsappFor(values), "_blank", "noopener,noreferrer");
      setStatus("handed-off");
      return;
    }

    setStatus("sending");
    try {
      await sendEnquiry(values);
      setStatus("sent");
      if (typeof window.fbq === "function") window.fbq("track", "Lead");
    } catch (err) {
      setFailure(err?.name === "AbortError" ? "The request timed out." : err?.message || "");
      setStatus("failed");
    }
  };

  const inputCls = (key) =>
    `mt-2 w-full rounded-xl bg-[var(--bg)] border px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)]/60 transition-colors focus:outline-none focus:border-[var(--blue-soft)] focus:ring-2 focus:ring-[var(--blue)]/30 ${
      errors[key] ? "border-[#ff9b85]/70" : "border-white/[0.12]"
    }`;
  const errorCount = Object.values(errors).filter(Boolean).length;
  const describedBy = (key, hint) => (errors[key] ? `${key}-error` : hint ? `${key}-hint` : undefined);

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="form-panel text-center py-14 outline-none">
        <p className="text-4xl" aria-hidden="true">✓</p>
        <h3 className="text-2xl font-semibold mt-4">Thanks, {values.name.trim().split(" ")[0]} — your enquiry has been sent.</h3>
        <p className="text-[var(--muted)] mt-3 max-w-md mx-auto">
          We’ve received your details and will reply {values.email ? `to ${values.email}` : `on ${values.phone}`}. If it’s
          urgent, message us on WhatsApp as well.
        </p>
        <a href={whatsappFor(values)} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">
          Also send on WhatsApp
        </a>
      </div>
    );
  }

  if (status === "handed-off") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="form-panel py-12 outline-none">
        <h3 className="text-2xl font-semibold">One more step — press send in WhatsApp</h3>
        <p className="text-[var(--muted)] mt-3 leading-relaxed">
          We opened WhatsApp with your message already written. <strong className="text-[var(--ink)]">It reaches us only after you press send there.</strong>{" "}
          If WhatsApp didn’t open, use one of these instead:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-7">
          <a href={whatsappFor(values)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open WhatsApp again
          </a>
          <a href={mailtoFor(values)} className="btn-ghost">
            Send by email instead
          </a>
        </div>
        <button type="button" onClick={() => setStatus("idle")} className="text-sm text-[var(--muted)] underline underline-offset-4 mt-6">
          Edit my message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form-panel" aria-labelledby="enquiry-heading">
      <h3 id="enquiry-heading" className="text-xl font-semibold">Tell us about your project</h3>
      <p className="text-sm text-[var(--muted)] mt-1.5">Fields marked optional can be skipped. Add an email or a phone number.</p>

      {status === "failed" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-6 rounded-xl border border-[#ff9b85]/40 bg-[#ff9b85]/[0.06] p-4 outline-none">
          <p className="font-medium text-[#ffc2b5]">Your enquiry was not sent.</p>
          <p className="text-sm text-[var(--muted)] mt-1">
            {failure ? `${failure} ` : ""}Your details are still here — try again, or send the same message another way:
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <a href={whatsappFor(values)} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !px-4 !text-sm">
              Send on WhatsApp
            </a>
            <a href={mailtoFor(values)} className="btn-ghost !py-2 !px-4 !text-sm">
              Send by email
            </a>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5 mt-7">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" maxLength={100} aria-required="true" value={values.name} onChange={set("name")} className={inputCls("name")} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
        </Field>
        <Field id="company" label="Business name" optional error={errors.company}>
          <input id="company" name="company" autoComplete="organization" maxLength={120} value={values.company} onChange={set("company")} className={inputCls("company")} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" maxLength={160} autoComplete="email" inputMode="email" value={values.email} onChange={set("email")} className={inputCls("email")} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
        </Field>
        <Field id="phone" label="Phone / WhatsApp" error={errors.phone} hint="Optional if you've given an email.">
          <input id="phone" name="phone" type="tel" maxLength={20} autoComplete="tel" inputMode="tel" value={values.phone} onChange={set("phone")} className={inputCls("phone")} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone", true)} placeholder="+91" />
        </Field>
        <Field id="service" label="What do you need?" error={errors.service}>
          <select id="service" name="service" aria-required="true" value={values.service} onChange={set("service")} className={`${inputCls("service")} appearance-none select-chevron`} aria-invalid={!!errors.service} aria-describedby={describedBy("service")}>
            <option value="">Choose a service…</option>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field id="timeline" label="Timeline" optional>
          <select id="timeline" name="timeline" value={values.timeline} onChange={set("timeline")} className={`${inputCls("timeline")} appearance-none select-chevron`}>
            <option value="">No fixed date</option>
            {timelineOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label="Project requirements" error={errors.message} hint="What does your business do, and what should the website or app help you achieve?">
            <textarea id="message" name="message" rows={5} maxLength={5000} aria-required="true" value={values.message} onChange={set("message")} className={`${inputCls("message")} resize-y min-h-[140px]`} aria-invalid={!!errors.message} aria-describedby={describedBy("message", true)} />
          </Field>
        </div>
        {/* honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="botcheck">Leave this empty</label>
          <input id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" value={values.botcheck} onChange={set("botcheck")} />
        </div>
      </div>

      <p role="status" className={`text-sm mt-6 ${errorCount ? "text-[#ffc2b5]" : "sr-only"}`}>
        {errorCount ? `Please check the ${errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} above.` : ""}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
        <button type="submit" className="btn-primary sm:min-w-[200px] disabled:opacity-60 disabled:cursor-wait" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : isEmailDeliveryConfigured ? (
            "Send enquiry"
          ) : (
            "Continue on WhatsApp"
          )}
        </button>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          {isEmailDeliveryConfigured
            ? "We only use your details to reply to this enquiry."
            : "Opens WhatsApp with your message written for you — you press send."}
        </p>
      </div>
    </form>
  );
}

export default EnquiryForm;
