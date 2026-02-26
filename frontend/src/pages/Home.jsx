// frontend/src/pages/Home.jsx
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";
import { WavyBackground } from "../components/wavy-background";

const Home = () => {
  const { portfolio, projects, loading } = usePortfolio();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const about = portfolio?.about || {};
  const skills = portfolio?.skills || [];
  const contact = portfolio?.contact || {};

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {about.name || "Portfolio"}
          </h1>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#skills" className="hover:text-blue-400 transition">Skills</a>
            <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            {user ? (
              <Link to="/admin/dashboard" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
                Dashboard
              </Link>
            ) : (
              <Link to="/admin/login" className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-800">
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Wavy Background */}
      <WavyBackground
        className="max-w-4xl mx-auto pt-69 pb-40 px-4"
        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
        waveOpacity={0.3}
        blur={8}
        speed="fast"
      >
        <div className="text-center">
          {about.profileImage && (
            <img
              src={about.profileImage}
              alt={about.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500 relative z-10"
            />
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
            Hi, I'm <span className="text-blue-400">{about.name || "Jay Pawar"}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-6 font-light">
            {about.title || "Full Stack Developer"}
          </p>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
            {about.bio || "I'm not just learning to code — I'm building systems that solve real-world problems. Full-Stack Developer in the making with a deep interest in backend architecture, cloud integrations, and scalable solutions."}
          </p>

          <div className="flex gap-4 justify-center relative z-10">
            <a
              href="#projects"
              className="bg-blue-500 px-8 py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
            >
              View My Work
            </a>

            {about.resumeLink && (
              <a
                href={about.resumeLink}
                target="_blank"
                className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-white/10 transition transform hover:scale-105"
              >
                Resume
              </a>
            )}
          </div>
        </div>
      </WavyBackground>

      {/* About Section */}
      <section id="about" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="bg-gray-800 rounded-xl p-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              {about.bio}
            </p>

            {about.experience && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Experience</h3>
                <p className="text-gray-400">{about.experience}</p>
              </div>
            )}

            {about.education && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <p className="text-gray-400">{about.education}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>

          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">{category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map((skill, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-center mb-12">Here are some of my recent works</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech, i) => (
                      <span key={i} className="bg-gray-700 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        className="text-gray-400 hover:text-white transition"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contact.email && (
                  <div className="flex items-center gap-4">
                    <FaEnvelope className="text-blue-400" />
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-400">
                      {contact.email}
                    </a>
                  </div>
                )}

                {contact.phone && (
                  <div className="flex items-center gap-4">
                    <FaPhone className="text-blue-400" />
                    <span>{contact.phone}</span>
                  </div>
                )}

                {contact.location && (
                  <div className="flex items-center gap-4">
                    <span className="text-blue-400">📍</span>
                    <span>{contact.location}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                {contact.github && (
                  <a href={contact.github} target="_blank" className="text-3xl hover:text-blue-400">
                    <FaGithub />
                  </a>
                )}
                {contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" className="text-3xl hover:text-blue-400">
                    <FaLinkedin />
                  </a>
                )}
                {contact.twitter && (
                  <a href={contact.twitter} target="_blank" className="text-3xl hover:text-blue-400">
                    <FaTwitter />
                  </a>
                )}
              </div>
            </div>

            {/* Simple Contact Form */}
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="py-6 border-t border-black text-center text-gray-500">
        <p>© {new Date().getFullYear()} {about.name || "Portfolio"}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;