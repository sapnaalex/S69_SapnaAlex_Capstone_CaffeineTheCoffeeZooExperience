const express = require("express");
const { 
    createNotification, 
    getAllNotifications, 
    getNotificationsByUserId,  
    deleteNotification 
} = require("../controllers/NotificationController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/")
    .get(protect, getAllNotifications)
    .post(protect, createNotification);
router.get("/user/:userId", protect, getNotificationsByUserId);
router.delete("/:id", protect, deleteNotification);


module.exports = router;
