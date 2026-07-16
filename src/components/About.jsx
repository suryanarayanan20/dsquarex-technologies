function About() {
  return (
    <section id="about" className="bg-[var(--bg)] text-[var(--ink)] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <p className="mono slash text-sm text-[var(--muted)] tracking-[0.15em]">ABOUT</p>

        <h2 className="text-4xl md:text-5xl font-semibold mt-4 max-w-3xl">
          About DSquareX Technologies
        </h2>

        <p className="text-[var(--muted)] text-lg md:text-xl mt-8 leading-relaxed max-w-3xl">
          DSquareX Technologies is a digital solutions company focused on
          helping businesses establish a strong online presence through
          modern websites, custom web applications and scalable backend
          solutions.
        </p>
        <p className="text-[var(--muted)] text-lg md:text-xl mt-6 leading-relaxed max-w-3xl">
          We combine technology, creativity and business strategy to
          deliver work that looks professional and drives real growth
          and customer engagement.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl">
          <div className="border-t border-white/[0.08] pt-5">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Direct communication with the person building your site —
              no handoffs, no middlemen.
            </p>
          </div>
          <div className="border-t border-white/[0.08] pt-5">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Built to be maintained and grown, not rebuilt from
              scratch a year later.
            </p>
          </div>
          <div className="border-t border-white/[0.08] pt-5">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Honest advice on what your business actually needs, even
              when that's a simpler build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

