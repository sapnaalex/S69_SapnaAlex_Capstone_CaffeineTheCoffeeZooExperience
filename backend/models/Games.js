const mongoose = require("mongoose");

const Games = new mongoose.Schema({
    gameName:{
        type: String,
        required: true
    },
    difficultyLevel:{
        type: String,
        enum: ["easy", "moderate", "hard"],
        required: true
    },
    gameTypes:{
        type: String,
        enum:["Bean-Hunt", "Brew-Master"],
        required: true
    },
    description:{
        type: String,
        required: true
    }, 
    highestScore:{
        type: mongoose.Schema.Types.ObjectId, ref:"LeaderboardSchema"
    }
   

},{timestamps:true});

module.exports = mongoose.model("GamesSchema", Games);
