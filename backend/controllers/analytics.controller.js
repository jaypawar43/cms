// backend/controllers/analytics.controller.js
import Project from "../models/project.js";
import Portfolio from "../models/portfolio.js";

export const getAnalytics = async (req, res) => {
  try {
    // Get total projects
    const totalProjects = await Project.countDocuments();

    // Get projects by status
    const statusStats = await Project.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get projects by category
    const categoryStats = await Project.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent projects (last 5)
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category status createdAt");

    // Get skills count
    const portfolio = await Portfolio.findOne();
    const totalSkills = portfolio?.skills?.length || 0;

    // Format the response to match what frontend expects
    const response = {
      success: true,
      totalProjects,
      statusStats: statusStats.length > 0 ? statusStats : [
        { _id: "active", count: 0 },
        { _id: "completed", count: 0 },
        { _id: "draft", count: 0 }
      ],
      categoryStats: categoryStats.length > 0 ? categoryStats : [],
      recentProjects: recentProjects || [],
      totalSkills
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error: error.message
    });
  }
};