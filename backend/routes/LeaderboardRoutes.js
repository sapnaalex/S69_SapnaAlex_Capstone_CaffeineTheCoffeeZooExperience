const express = require("express");
const leaderboardController = require("../controllers/LeaderboardController");
const protect = require("../middlewares/authMiddleware");



const router = express.Router();

router.get("/leaderboard", leaderboardController.getLeaderboard); 
router.get("/leaderboard/:id", leaderboardController.getLeaderboardById);
router.post("/leaderboard", protect, leaderboardController.createLeaderboard);
router.put("/leaderboard/:id", protect, leaderboardController.updateLeaderboard);
router.delete("/leaderboard/:id", protect, leaderboardController.deleteLeaderboard);

module.exports = router;
