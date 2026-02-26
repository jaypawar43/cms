// frontend/src/pages/admin/Analytics.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await API.get("/analytics");
      console.log("Analytics data:", data); // Debug log
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Prepare data for charts
  const statusData = {
    labels: analytics?.statusStats?.map(s => s._id) || ['No Data'],
    datasets: [
      {
        label: 'Projects by Status',
        data: analytics?.statusStats?.map(s => s.count) || [0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    labels: analytics?.categoryStats?.map(c => c._id) || ['No Categories'],
    datasets: [
      {
        label: 'Projects by Category',
        data: analytics?.categoryStats?.map(c => c.count) || [0],
        backgroundColor: [
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <Link 
            to="/admin/dashboard" 
            className="text-blue-500 hover:text-blue-700"
          >
            ← Dashboard
          </Link>
        </div>
      </nav>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Projects</h3>
            <p className="text-4xl font-bold text-blue-600">{analytics?.totalProjects || 0}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Active Projects</h3>
            <p className="text-4xl font-bold text-green-600">
              {analytics?.statusStats?.find(s => s._id === 'active')?.count || 0}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Completed</h3>
            <p className="text-4xl font-bold text-purple-600">
              {analytics?.statusStats?.find(s => s._id === 'completed')?.count || 0}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Skills</h3>
            <p className="text-4xl font-bold text-orange-600">
              {analytics?.totalSkills || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Categories</h3>
            <p className="text-4xl font-bold text-pink-600">
              {analytics?.categoryStats?.length || 0}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Projects by Status</h2>
            <div className="h-64">
              {analytics?.totalProjects > 0 ? (
                <Pie data={statusData} options={{ maintainAspectRatio: false }} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No project data available
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Projects by Category</h2>
            <div className="h-64">
              {analytics?.categoryStats?.length > 0 ? (
                <Bar 
                  data={categoryData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }} 
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No category data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Recent Projects</h2>
          {analytics?.recentProjects?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analytics.recentProjects.map((project) => (
                    <tr key={project._id}>
                      <td className="px-6 py-4">{project.title}</td>
                      <td className="px-6 py-4">{project.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'active' ? 'bg-green-100 text-green-600' :
                          project.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(project.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No projects added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;