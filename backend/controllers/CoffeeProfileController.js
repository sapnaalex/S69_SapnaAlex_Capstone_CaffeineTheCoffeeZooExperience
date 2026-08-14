const CoffeeProfile = require("../models/CoffeeProfile");

const profileFields = ["linkedCoffeeCompanion", "name", "origin", "flavourProfile", "description"];

exports.createProfile = async (req, res) => {
    try {
        const missingFields = ["linkedCoffeeCompanion", "name", "flavourProfile", "description"]
            .filter((field) => !req.body[field]);
        if (missingFields.length) return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });

        const profile = await CoffeeProfile.create(
            profileFields.reduce((data, field) => ({ ...data, ...(req.body[field] !== undefined ? { [field]: req.body[field] } : {}) }), {})
        );
        res.status(201).json({ message: "Coffee profile created successfully", data: profile });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProfiles = async (_req, res) => {
    try {
        const profiles = await CoffeeProfile.find()
            .populate("linkedCoffeeCompanion", "CompanionName personality")
            .populate("flavourProfile", "title description");
        res.status(200).json({ data: profiles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await CoffeeProfile.findById(req.params.id)
            .populate("linkedCoffeeCompanion", "CompanionName personality")
            .populate("flavourProfile", "title description ingredients");
        if (!profile) return res.status(404).json({ message: "Coffee profile not found" });
        res.status(200).json({ data: profile });
    } catch (_error) {
        res.status(400).json({ message: "Invalid coffee profile id" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const update = profileFields.reduce((data, field) => ({ ...data, ...(req.body[field] !== undefined ? { [field]: req.body[field] } : {}) }), {});
        const profile = await CoffeeProfile.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
        if (!profile) return res.status(404).json({ message: "Coffee profile not found" });
        res.status(200).json({ message: "Coffee profile updated successfully", data: profile });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const profile = await CoffeeProfile.findByIdAndDelete(req.params.id);
        if (!profile) return res.status(404).json({ message: "Coffee profile not found" });
        res.status(200).json({ message: "Coffee profile deleted successfully" });
    } catch (_error) {
        res.status(400).json({ message: "Invalid coffee profile id" });
    }
};
