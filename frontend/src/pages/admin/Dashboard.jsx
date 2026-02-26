// frontend/src/pages/admin/Dashboard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaProjectDiagram, 
  FaCode, 
  FaUser, 
  FaEnvelope,
  FaChartBar 
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const cards = [
    {
      title: "Projects",
      icon: FaProjectDiagram,
      color: "bg-blue-500",
      link: "/admin/projects",
      count: "Manage"
    },
    {
      title: "Skills",
      icon: FaCode,
      color: "bg-green-500",
      link: "/admin/skills",
      count: "Manage"
    },
    {
      title: "About",
      icon: FaUser,
      color: "bg-purple-500",
      link: "/admin/about",
      count: "Edit"
    },
    {
      title: "Contact",
      icon: FaEnvelope,
      color: "bg-orange-500",
      link: "/admin/contact",
      count: "Update"
    },
    {
      title: "Analytics",
      icon: FaChartBar,
      color: "bg-pink-500",
      link: "/admin/analytics",
      count: "View Stats"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-8">Quick Actions</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                <card.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.count}</p>
            </Link>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h3>
          <p className="opacity-90">
            You can manage all your portfolio content from here. 
            Use the cards above to navigate to different sections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;