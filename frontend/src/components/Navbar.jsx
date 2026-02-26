// frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-8 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          DevPortfolio
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <a href="#projects" className="hover:text-gray-300">Projects</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;