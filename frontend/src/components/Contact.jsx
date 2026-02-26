// frontend/src/pages/Home.jsx
import { PortfolioProvider } from "../context/PortfolioContext";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <PortfolioProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </PortfolioProvider>
  );
};

export default Home;