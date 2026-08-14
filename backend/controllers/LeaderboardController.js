const Leaderboards = require("../models/Leaderboards");




const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboards.find().sort({ rank: 1, score: -1 });
        res.status(200).json({ data: leaderboard });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getLeaderboardById = async (req, res) => {
    try {
        const leaderboardEntry = await Leaderboards.findById(req.params.id);
        if (!leaderboardEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.status(200).json({ data: leaderboardEntry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createLeaderboard = async (req, res) => {
    try {
        const newEntry = new Leaderboards(req.body);
        await newEntry.save();
        res.status(201).json({ message: "Leaderboard entry created successfully", data: newEntry });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateLeaderboard = async (req, res) => {
    try {
        const updatedEntry = await Leaderboards.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.status(200).json({ message: "Leaderboard entry updated", data: updatedEntry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLeaderboard = async (req, res) => {
    try {
        const deletedEntry = await Leaderboards.findByIdAndDelete(req.params.id);
        if (!deletedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.status(200).json({ message: "Leaderboard entry deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getLeaderboard,
    getLeaderboardById,
    createLeaderboard,
    updateLeaderboard,
    deleteLeaderboard
};
