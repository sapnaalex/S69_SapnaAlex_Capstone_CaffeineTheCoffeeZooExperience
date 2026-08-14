const Notification = require("../models/Notification");

exports.createNotification = async (req, res) => {
    try {
        if (!req.body.message?.trim()) return res.status(400).json({ message: "Message is required" });
        const notification = await Notification.create({ user: req.user._id, message: req.body.message.trim() });
        res.status(201).json({ message: "Notification created successfully", data: notification });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ sentAt: -1 });
        res.status(200).json({ data: notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNotificationsByUserId = async (req, res) => {
    if (req.params.userId !== req.user._id.toString()) {
        return res.status(403).json({ message: "You can only view your own notifications" });
    }
    return exports.getAllNotifications(req, res);
};

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (_error) {
        res.status(400).json({ message: "Invalid notification id" });
    }
};
