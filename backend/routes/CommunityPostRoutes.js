const express = require("express");
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../controllers/CommunityPostController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/")
    .get(getAllPosts)
    .post(protect, createPost);
router.route("/:id")
    .get(getPostById)
    .put(protect, updatePost)
    .delete(protect, deletePost);

module.exports = router;
