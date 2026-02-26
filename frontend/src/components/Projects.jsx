// frontend/src/components/Projects.jsx
import { usePortfolio } from "../context/PortfolioContext";
import { useState } from "react";

const Projects = () => {
  const { projects, loading } = usePortfolio();
  const [filter, setFilter] = useState("all");

  if (loading) {
    return <div className="py-20 text-center">Loading projects...</div>;
  }

  // Get unique categories
  const categories = ["all", ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(p => p.category === filter);

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-600">No projects added yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">My Projects</h2>
        <p className="text-gray-600 text-center mb-8">
          Here are some of my recent works
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, i) => (
                    <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;