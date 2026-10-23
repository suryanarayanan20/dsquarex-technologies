import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Process from "../components/Process";
import About from "../components/About";
import Contact from "../components/Contact";
import usePageMeta from "../hooks/usePageMeta";
import { seo } from "../data/site";

function Home() {
  usePageMeta({
    title: seo.homeTitle,
    description: seo.homeDescription,
    path: "/",
  });

  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Process />
      <About />
      <Contact />
    </>
  );
}

export default Home;
