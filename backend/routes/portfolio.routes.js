// backend/routes/portfolio.routes.js
import express from "express";
import {
  getPortfolio,
  updateAbout,
  addSkill,
  deleteSkill,
  updateContact
} from "../controllers/portfolio.controllers.js";  // ← Change from "portfolio.controllers.js" to "portfolio.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route
router.get("/", getPortfolio);

// Protected routes
router.put("/about", protect, updateAbout);
router.post("/skills", protect, addSkill);
router.delete("/skills/:index", protect, deleteSkill);
router.put("/contact", protect, updateContact);

export default router;