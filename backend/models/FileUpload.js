const mongoose = require("mongoose");

const FileUploadSchema = new mongoose.Schema({
    publicId: { type: String, required: true }, 
    url: { type: String, required: true },      
    originalname: { type: String }, // Ensure optional fields are included
    mimetype: { type: String },
    size: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("FileUpload", FileUploadSchema);
