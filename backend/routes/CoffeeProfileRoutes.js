const express = require("express");
const { createProfile, getAllProfiles, getProfileById, updateProfile, deleteProfile } = require("../controllers/CoffeeProfileController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/")
    .get(getAllProfiles)
    .post(protect, createProfile);
router.route("/:id")
    .get(getProfileById)
    .put(protect, updateProfile)
    .delete(protect, deleteProfile);

module.exports = router;
