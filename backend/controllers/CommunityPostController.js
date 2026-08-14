const Post = require("../models/Post");

const populateCreator = (query) => query.populate("createdBy", "username emailID profilePicture");

exports.createPost = async (req, res) => {
    try {
        const { title, content, picture } = req.body;
        if (!title?.trim() || !content?.trim()) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const post = await Post.create({ title: title.trim(), content: content.trim(), picture, createdBy: req.user._id });
        res.status(201).json({ message: "Post created successfully", data: post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPosts = async (_req, res) => {
    try {
        const posts = await populateCreator(Post.find().sort({ postedOn: -1 }));
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await populateCreator(Post.findById(req.params.id)
            .populate({ path: "comments", populate: { path: "createdBy", select: "username profilePicture" } }));
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ data: post });
    } catch (_error) {
        res.status(400).json({ message: "Invalid post id" });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only update your own posts" });
        }
        ["title", "content", "picture"].forEach((field) => {
            if (req.body[field] !== undefined) post[field] = req.body[field];
        });
        await post.save();
        res.status(200).json({ message: "Post updated successfully", data: post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }
        await post.deleteOne();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (_error) {
        res.status(400).json({ message: "Invalid post id" });
    }
};
