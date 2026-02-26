// frontend/src/pages/admin/Skills.jsx
import { useState, useEffect } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    level: 80,
    category: "Frontend"
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await API.get("/portfolio");
      setSkills(data.data.skills || []);
    } catch (error) {
      toast.error("Failed to fetch skills");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingIndex !== null) {
        // Update existing skill
        await API.put(`/portfolio/skills/${editingIndex}`, formData);
        toast.success("Skill updated successfully");
      } else {
        // Add new skill
        await API.post("/portfolio/skills", formData);
        toast.success("Skill added successfully");
      }
      
      setShowForm(false);
      setEditingIndex(null);
      setFormData({ name: "", level: 80, category: "Frontend" });
      fetchSkills();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(skills[index]);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    
    try {
      await API.delete(`/portfolio/skills/${index}`);
      toast.success("Skill deleted successfully");
      fetchSkills();
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Skills</h1>
          <button
            onClick={() => {
              setEditingIndex(null);
              setFormData({ name: "", level: 80, category: "Frontend" });
              setShowForm(!showForm);
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            {showForm ? "Cancel" : "Add New Skill"}
          </button>
        </div>

        {/* Skill Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit Skill" : "Add New Skill"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Skill Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Proficiency Level (0-100)</label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Database</option>
                  <option>DevOps</option>
                  <option>Tools</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                {editingIndex !== null ? "Update Skill" : "Add Skill"}
              </button>
            </form>
          </div>
        )}

        {/* Skills List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Skill Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Level</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{skill.name}</td>
                  <td className="px-6 py-4">{skill.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 rounded-full h-2"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span>{skill.level}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No skills added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;