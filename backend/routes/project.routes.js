// backend/routes/project.routes.js
import express from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";  // ← Add this

const router = express.Router();

// Public routes
router.get("/", getAllProjects);

// Protected routes
router.post("/", protect, createProject);        // ← Add protect
router.put("/:id", protect, updateProject);      // ← Add protect
router.delete("/:id", protect, deleteProject);   // ← Add protect

export default router;