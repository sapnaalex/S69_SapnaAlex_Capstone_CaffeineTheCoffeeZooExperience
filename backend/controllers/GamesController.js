const Games = require("../models/Games");



exports.createGame = async (req, res) => {
    try {
        const newGame = new Games(req.body);
        await newGame.save();
        res.status(201).json({ message: "Game created successfully", data: newGame });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllGames = async (req, res) => {
    try {
        const games = await Games.find();
        res.status(200).json({ data: games });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getGameById = async (req, res) => {
    try {
        const game = await Games.findById(req.params.id)
            .populate("highestScore", "username score rank");

        if (!game) return res.status(404).json({ message: "Game not found" });

        res.status(200).json({ data: game });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Games.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGame) return res.status(404).json({ message: "Game not found" });
        res.status(200).json({ message: "Game updated successfully", data: updatedGame });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        const deletedGame = await Games.findByIdAndDelete(req.params.id);
        if (!deletedGame) return res.status(404).json({ message: "Game not found" });
        res.status(200).json({ message: "Game deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
