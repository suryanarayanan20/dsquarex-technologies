function Footer() {
  return (
    <footer className="bg-[var(--bg)] border-t border-white/[0.08] text-[var(--muted)] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-[var(--ink)] font-semibold">DSquareX Technologies</h3>
          <p className="mt-1 text-sm">Building digital solutions that help businesses grow.</p>
        </div>

        <div className="text-center md:text-right text-sm">
          <p>sn3139132@gmail.com</p>
          <p className="mt-1">© 2026 DSquareX Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
