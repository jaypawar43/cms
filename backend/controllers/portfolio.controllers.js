// backend/controllers/portfolio.controller.js
import Portfolio from "../models/portfolio.js";

// @desc    Get portfolio data
// @route   GET /api/portfolio
export const getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }
    res.json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update about section
// @route   PUT /api/portfolio/about
export const updateAbout = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) portfolio = new Portfolio();
    
    portfolio.about = { ...portfolio.about, ...req.body };
    await portfolio.save();
    
    res.json({ success: true, message: "About updated", data: portfolio.about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add skill
// @route   POST /api/portfolio/skills
export const addSkill = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) portfolio = new Portfolio();
    
    portfolio.skills.push(req.body);
    await portfolio.save();
    
    res.status(201).json({ success: true, message: "Skill added", data: portfolio.skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/portfolio/skills/:index
export const deleteSkill = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const index = parseInt(req.params.index);
    
    portfolio.skills.splice(index, 1);
    await portfolio.save();
    
    res.json({ success: true, message: "Skill deleted", data: portfolio.skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update contact
// @route   PUT /api/portfolio/contact
export const updateContact = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) portfolio = new Portfolio();
    
    portfolio.contact = { ...portfolio.contact, ...req.body };
    await portfolio.save();
    
    res.json({ success: true, message: "Contact updated", data: portfolio.contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};