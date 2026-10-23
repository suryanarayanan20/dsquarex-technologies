import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

/**
 * Scroll handling for client-side navigation:
 *  - "/#contact" style links scroll to the section (after the page renders)
 *  - plain route changes start at the top
 * Also reports a PageView to the existing Meta Pixel on route changes after
 * the first load (the inline snippet in index.html tracks the first one).
 */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait briefly so the target section exists after a route change and any
      // scroll lock from the closing mobile menu has been released.
      const smooth = !first.current;
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      }, 80);
      return () => clearTimeout(t);
    } else if (!first.current) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (typeof window.fbq === "function") window.fbq("track", "PageView");
    // move focus to main content so screen readers announce the new page
    const main = document.getElementById("main");
    if (main && !hash) main.focus({ preventScroll: true });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteEffects />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
