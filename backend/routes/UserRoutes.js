const express = require("express");
const{ getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/UserController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/protected-routes", protect, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});
router.route("/")
    .get(protect, getAllUsers);
router.route("/:id")
    .get(protect, getUserById)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

module.exports = router
