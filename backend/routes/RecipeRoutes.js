const express = require("express");
const {
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getAllRecipes,
} = require("../controllers/RecipeController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/")
    .get(getAllRecipes)
    .post(protect, createRecipe);
router.route("/:id")
    .get(getRecipeById)
    .put(protect, updateRecipe)
    .delete(protect, deleteRecipe);

module.exports = router;
