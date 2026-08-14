const CoffeeCompanion = require("../models/CoffeeCompanion");

exports.createCompanion = async (req, res) => {
    try {
        const { CompanionName, personality, coffeeProfile } = req.body;
        if (!CompanionName?.trim() || !personality?.trim()) {
            return res.status(400).json({ message: "CompanionName and personality are required" });
        }
        const companion = await CoffeeCompanion.create({ CompanionName: CompanionName.trim(), personality: personality.trim(), coffeeProfile });
        res.status(201).json({ message: "Coffee companion created successfully", data: companion });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCompanions = async (_req, res) => {
    try {
        const companions = await CoffeeCompanion.find().populate("coffeeProfile", "name origin description");
        res.status(200).json({ data: companions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCompanionById = async (req, res) => {
    try {
        const companion = await CoffeeCompanion.findById(req.params.id)
            .populate("coffeeProfile", "name origin description flavourProfile");
        if (!companion) return res.status(404).json({ message: "Coffee companion not found" });
        res.status(200).json({ data: companion });
    } catch (_error) {
        res.status(400).json({ message: "Invalid coffee companion id" });
    }
};

exports.updateCompanion = async (req, res) => {
    try {
        const update = ["CompanionName", "personality", "coffeeProfile"].reduce(
            (data, field) => ({ ...data, ...(req.body[field] !== undefined ? { [field]: req.body[field] } : {}) }), {}
        );
        const companion = await CoffeeCompanion.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
        if (!companion) return res.status(404).json({ message: "Coffee companion not found" });
        res.status(200).json({ message: "Coffee companion updated successfully", data: companion });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCompanion = async (req, res) => {
    try {
        const companion = await CoffeeCompanion.findByIdAndDelete(req.params.id);
        if (!companion) return res.status(404).json({ message: "Coffee companion not found" });
        res.status(200).json({ message: "Coffee companion deleted successfully" });
    } catch (_error) {
        res.status(400).json({ message: "Invalid coffee companion id" });
    }
};
