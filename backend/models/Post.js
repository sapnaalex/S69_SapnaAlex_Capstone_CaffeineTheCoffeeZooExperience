const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    picture:{
        type: String
    },
    likes:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    postedOn:{
        type: Date,
        default: Date.now
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:"CommentSchema"}]
})

module.exports = mongoose.model("PostSchema", Post);
