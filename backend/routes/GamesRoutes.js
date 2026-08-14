const express = require("express");
const { createGame, getAllGames, getGameById, updateGame, deleteGame } = require("../controllers/GamesController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/")
    .get(getAllGames)
    .post(protect, createGame);
router.route("/:id")
    .get(getGameById)
    .put(protect, updateGame)
    .delete(protect, deleteGame);

module.exports = router;
