const express = require("express");
const upload = require("../middlewares/multer"); 
const { uploadFile, getAllFiles, getFileById, deleteFile } = require("../controllers/FileUploadController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, upload.single("file"), uploadFile);
router.get("/", protect, getAllFiles);
router.get("/:id", protect, getFileById);
router.delete("/:id", protect, deleteFile);

module.exports = router;
