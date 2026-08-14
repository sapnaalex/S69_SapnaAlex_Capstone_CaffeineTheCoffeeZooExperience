    const mongoose = require("mongoose");

    const Users = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        emailID:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password:{
            type: String,
            required: true,
            // match: [
            //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9,]).{7,18}$/,
            // "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character."
            // ],
            trim: true,      
        },
        profilePicture: {
            type: String
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema"}],
        favorites: [{type: mongoose.Schema.Types.ObjectId, ref:"RecipeSchema"}],
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:"CommentSchema"}],
        leaderboard: {type: mongoose.Schema.Types.ObjectId, ref:"LeaderboardSchema"}

    })

    module.exports = mongoose.model("User", Users);
