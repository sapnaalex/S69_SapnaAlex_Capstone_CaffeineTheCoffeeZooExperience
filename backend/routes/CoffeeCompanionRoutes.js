const express = require("express");
const { createCompanion, getAllCompanions, getCompanionById, updateCompanion, deleteCompanion } = require("../controllers/CoffeeCompanionController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/")
    .get(getAllCompanions)
    .post(protect, createCompanion);
router.route("/:id")
    .get(getCompanionById)
    .put(protect, updateCompanion)
    .delete(protect, deleteCompanion);

module.exports = router;
