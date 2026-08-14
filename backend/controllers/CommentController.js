const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        if (!postId || !content?.trim()) return res.status(400).json({ message: "Post id and content are required" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const comment = await Comment.create({ post: post._id, content: content.trim(), createdBy: req.user._id });
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json({ message: "Comment created successfully", data: comment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const filter = req.query.postId ? { post: req.query.postId } : {};
        const comments = await Comment.find(filter)
            .populate("createdBy", "username profilePicture")
            .sort({ createdAt: 1 });
        res.status(200).json({ data: comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate("createdBy", "username profilePicture");
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json({ data: comment });
    } catch (_error) {
        res.status(400).json({ message: "Invalid comment id" });
    }
};

exports.updateComment = async (req, res) => {
    try {
        if (!req.body.content?.trim()) return res.status(400).json({ message: "Content is required" });
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        if (comment.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only update your own comments" });
        }
        comment.content = req.body.content.trim();
        await comment.save();
        res.status(200).json({ message: "Comment updated successfully", data: comment });
    } catch (_error) {
        res.status(400).json({ message: "Invalid comment id" });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        if (comment.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
        await comment.deleteOne();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (_error) {
        res.status(400).json({ message: "Invalid comment id" });
    }
};
