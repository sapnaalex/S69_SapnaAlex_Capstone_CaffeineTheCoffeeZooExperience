const Favorites = require("../models/Favorites");
const Recipe = require("../models/Recipe");

exports.addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;
        if (!recipeId) return res.status(400).json({ message: "Recipe id is required" });
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        const favorites = await Favorites.findOneAndUpdate(
            { user: req.user._id },
            { $addToSet: { recipes: recipeId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).populate("recipes", "title description ingredients preparationTime favoriteCount createdBy");
        res.status(200).json({ message: "Favorite added successfully", data: favorites });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllFavorites = async (req, res) => {
    try {
        const favorites = await Favorites.findOne({ user: req.user._id })
            .populate({ path: "recipes", populate: { path: "createdBy", select: "username profilePicture" } });
        res.status(200).json({ data: favorites || { user: req.user._id, recipes: [] } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFavoriteById = exports.getAllFavorites;

exports.removeFavorite = async (req, res) => {
    try {
        const favorites = await Favorites.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { recipes: req.params.recipeId } },
            { new: true }
        ).populate("recipes", "title description ingredients preparationTime favoriteCount createdBy");
        if (!favorites) return res.status(404).json({ message: "Favorites not found" });
        res.status(200).json({ message: "Favorite removed successfully", data: favorites });
    } catch (_error) {
        res.status(400).json({ message: "Invalid recipe id" });
    }
};
