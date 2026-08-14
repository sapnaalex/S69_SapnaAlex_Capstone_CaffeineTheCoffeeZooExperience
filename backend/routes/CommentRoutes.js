const express = require("express");
const { createComment, getAllComments, getCommentById, updateComment, deleteComment } = require("../controllers/CommentController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/")
    .get(getAllComments)
    .post(protect, createComment);
router.route("/:id")
    .get(getCommentById)
    .put(protect, updateComment)
    .delete(protect, deleteComment);

module.exports = router;
