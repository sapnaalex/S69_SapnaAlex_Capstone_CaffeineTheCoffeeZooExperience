const { cloudinary } = require("../config/cloudinary");
const FileUpload = require("../models/FileUpload");

const uploadFile = async (req, res) => {
    try {
        if (!req.file?.path) return res.status(400).json({ message: "No file uploaded" });

        const file = await FileUpload.create({
            url: req.file.path,
            publicId: req.file.filename || req.file.public_id,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            uploadedBy: req.user._id,
        });
        res.status(201).json({ message: "File uploaded successfully", data: file, fileUrl: file.url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllFiles = async (req, res) => {
    try {
        const files = await FileUpload.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ data: files });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFileById = async (req, res) => {
    try {
        const file = await FileUpload.findOne({ _id: req.params.id, uploadedBy: req.user._id });
        if (!file) return res.status(404).json({ message: "File not found" });
        res.status(200).json({ data: file });
    } catch (_error) {
        res.status(400).json({ message: "Invalid file id" });
    }
};

const deleteFile = async (req, res) => {
    try {
        const file = await FileUpload.findOne({ _id: req.params.id, uploadedBy: req.user._id });
        if (!file) return res.status(404).json({ message: "File not found" });
        await cloudinary.uploader.destroy(file.publicId);
        await file.deleteOne();
        res.status(200).json({ message: "File deleted successfully" });
    } catch (_error) {
        res.status(400).json({ message: "Unable to delete file" });
    }
};

module.exports = { uploadFile, getAllFiles, getFileById, deleteFile };
