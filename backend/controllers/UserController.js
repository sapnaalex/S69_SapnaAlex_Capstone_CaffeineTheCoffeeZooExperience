const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // Generate JWT token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new Users(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find().select("-password");
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
            .select("-password")
            .populate("favorites");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        if (req.params.id !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only update your own user record" });
        }
        const update = ["username", "emailID", "profilePicture"].reduce(
            (data, field) => ({ ...data, ...(req.body[field] !== undefined ? { [field]: req.body[field] } : {}) }), {}
        );
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
            .select("-password");
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own user record" });
        }
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
