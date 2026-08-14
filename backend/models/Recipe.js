const mongoose = require("mongoose");

const Recipes = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    ingredients:{
        type: String,
        required: true
    },
    preparationTime:{
        hours:{
            type: Number,
            default: 0
        },
        minutes:{
            type: Number,
            default: 0
        }
    },
    recipe: {
        type: String,
        required: true
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:"CommentSchema"}],
    favoriteCount: {type: Number, default: 0}
})

module.exports = mongoose.model("RecipeSchema", Recipes);
