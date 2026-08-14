const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, email: user.emailID }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
};

const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  emailID: user.emailID,
  profilePicture: user.profilePicture,
});

// User Registration
const register = async (req, res) => {
  try {
    const { username, emailID, password } = req.body;
    if (!username?.trim() || !emailID?.trim() || !password) {
      return res.status(400).json({ message: "Username, emailID, and password are required" });
    }
    
    let user = await User.findOne({ emailID });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, emailID, password: hashedPassword });

    await user.save();
    const token = generateToken(user);
    res.status(201).json({ message: 'User registered successfully', token, user: publicUser(user) });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Submission: Username-Password Authentication ✅


// User Login
const login = async (req, res) => {
  try {
    const { emailID, password } = req.body;
    if (!emailID?.trim() || !password) {
      return res.status(400).json({ message: "emailID and password are required" });
    }
    const user = await User.findOne({ emailID });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.json({ token, user: publicUser(user) });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};


// Update User Profile
const updateUser = async (req, res) => {
  try {
    const { username, emailID } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.emailID = emailID || user.emailID;

    await user.save();
    res.json({ message: 'User updated successfully', user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, updateUser, deleteUser };


