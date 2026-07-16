function Contact() {
  return (
    <section id="contact" className="bg-[var(--bg)] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-4xl mx-auto bg-[var(--bg-raised)] border border-white/[0.09] rounded-[28px] p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--blue)]/15 rotate-12 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[var(--orange)]/15 -rotate-12 blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="mono slash text-sm text-[var(--muted)] tracking-[0.15em] justify-center flex">
              CONTACT
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold mt-4">
              Ready to grow your business?
            </h2>
            <p className="text-[var(--muted)] text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
              Need a professional website, a custom web app, or a Java
              backend built right? Let's talk about your project.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
              <a
                href="https://wa.me/916282787553"
                target="_blank"
                rel="noreferrer"
                className="bg-[var(--blue)] hover:bg-[var(--blue-soft)] px-8 py-4 rounded-xl text-base font-medium transition-colors"
              >
                WhatsApp us
              </a>
              <a
                href="mailto:sn3139132@gmail.com"
                className="border border-[var(--orange)]/50 hover:bg-[var(--orange)]/10 px-8 py-4 rounded-xl text-base font-medium transition-colors"
              >
                Email us
              </a>
            </div>

            <p className="mono text-xs text-[var(--muted)] tracking-wide mt-6">
              No obligation <span className="text-[var(--orange)]">/</span> no hard sell <span className="text-[var(--orange)]">/</span> just a clear next step
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

