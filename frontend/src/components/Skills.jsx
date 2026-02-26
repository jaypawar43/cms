// frontend/src/components/Skills.jsx
import { usePortfolio } from "../context/PortfolioContext";

const Skills = () => {
  const { portfolio } = usePortfolio();
  const skills = portfolio?.skills || [];

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>

        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h3 className="text-2xl font-semibold mb-6">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills
                .filter(s => s.category === category)
                .map((skill, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="font-semibold mb-2">{skill.name}</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-1">{skill.level}%</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;