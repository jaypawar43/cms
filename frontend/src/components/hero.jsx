// frontend/src/components/Hero.jsx
import { usePortfolio } from "../context/PortfolioContext";

const Hero = () => {
  const { portfolio, loading } = usePortfolio();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="text-blue-400">{portfolio?.about?.name || "Your Name"}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {portfolio?.about?.title || "Full Stack Developer"}
        </p>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          {portfolio?.about?.bio || "I build modern web applications with React, Node.js, and MongoDB."}
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#projects"
            className="bg-blue-500 px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            View Projects
          </a>
          {portfolio?.about?.resumeLink && (
            <a
              href={portfolio.about.resumeLink}
              target="_blank"
              className="border border-gray-600 px-8 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Resume
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;