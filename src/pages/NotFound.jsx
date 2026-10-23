import { Link, useLocation } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";

function NotFound() {
  const { pathname } = useLocation();
  usePageMeta({
    title: `Page not found | ${site.name}`,
    description: "The page you were looking for doesn't exist.",
    path: pathname,
    noindex: true,
  });

  return (
    <section className="min-h-[80vh] flex items-center bg-[var(--bg)] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="mono text-sm text-[var(--orange)] tracking-[0.2em]">404</p>
        <h1 className="text-4xl md:text-5xl font-semibold mt-4">This page doesn’t exist</h1>
        <p className="text-[var(--muted)] text-lg mt-5">
          The link may be old, or the address may have a typo.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
          <Link to="/" className="btn-primary">Back to home</Link>
          <Link to="/work" className="btn-ghost">See our work</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
