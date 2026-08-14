const Recipe = require("../models/Recipe");

const requiredFields = ["title", "ingredients", "recipe"];
const hasRequiredFields = (payload) =>
    requiredFields.every((field) => typeof payload[field] === "string" && payload[field].trim());

exports.createRecipe = async (req, res) => {
    try {
        if (!hasRequiredFields(req.body)) {
            return res.status(400).json({ message: "Title, ingredients, and recipe are required" });
        }
        const recipe = await Recipe.create({
            title: req.body.title.trim(),
            description: req.body.description,
            ingredients: req.body.ingredients.trim(),
            preparationTime: req.body.preparationTime,
            recipe: req.body.recipe.trim(),
            createdBy: req.user._id,
        });
        res.status(201).json({ message: "Recipe created successfully", data: recipe });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const filter = req.query.createdBy ? { createdBy: req.query.createdBy } : {};
        const recipes = await Recipe.find(filter)
            .populate("createdBy", "username emailID profilePicture")
            .sort({ _id: -1 });
        res.status(200).json({ data: recipes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("createdBy", "username emailID profilePicture");
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json({ data: recipe });
    } catch (_error) {
        res.status(400).json({ message: "Invalid recipe id" });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        if (recipe.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only update your own recipes" });
        }
        ["title", "description", "ingredients", "preparationTime", "recipe"].forEach((field) => {
            if (req.body[field] !== undefined) recipe[field] = req.body[field];
        });
        await recipe.save();
        res.status(200).json({ message: "Recipe updated successfully", data: recipe });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        if (recipe.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own recipes" });
        }
        await recipe.deleteOne();
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (_error) {
        res.status(400).json({ message: "Invalid recipe id" });
    }
};
