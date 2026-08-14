const mongoose = require("mongoose");

const Comments = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:"User", required: true
    },
    post: {type: mongoose.Schema.Types.ObjectId, ref:"PostSchema", required: true},
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("CommentSchema", Comments);
