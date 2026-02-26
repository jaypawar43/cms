// backend/models/portfolio.model.js
import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  about: {
    name: { type: String, default: "Your Name" },
    title: { type: String, default: "Full Stack Developer" },
    bio: { type: String, default: "Write your bio here..." },
    profileImage: { type: String, default: "" },
    resumeLink: { type: String, default: "" },
    experience: { type: String, default: "" },
    education: { type: String, default: "" }
  },
  skills: [{
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100, default: 80 },
    category: { 
      type: String, 
      enum: ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"],
      default: "Frontend"
    }
  }],
  contact: {
    email: { type: String, default: "your.email@example.com" },
    phone: { type: String, default: "" },
    location: { type: String, default: "Your City, Country" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" }
  }
}, { timestamps: true });

// Ensure only one document exists
portfolioSchema.pre('save', async function(next) {
  const count = await this.constructor.countDocuments();
  if (count > 0 && this.isNew) {
    throw new Error('Only one portfolio document can exist');
  }
  next();
});

export default mongoose.model("Portfolio", portfolioSchema);