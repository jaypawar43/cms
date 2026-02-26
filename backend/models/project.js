import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "General",
    },
    status: {
      type: String,
      enum: ["active", "completed", "draft"],
      default: "active",
    },
    githubLink: {
      type: String,
    },
    liveLink: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;