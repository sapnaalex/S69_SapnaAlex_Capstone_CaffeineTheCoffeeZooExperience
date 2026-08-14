const express = require("express");
const { addFavorite, getAllFavorites, getFavoriteById, removeFavorite } = require("../controllers/FavoriteController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/")
    .get(protect, getAllFavorites)
    .post(protect, addFavorite);
router.delete("/:recipeId", protect, removeFavorite);

module.exports = router;
