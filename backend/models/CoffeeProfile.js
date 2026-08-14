const mongoose = require("mongoose");

const CoffeeProfile = new mongoose.Schema({
    linkedCoffeeCompanion:{
        type:mongoose.Schema.Types.ObjectId, ref:"CoffeeCompanion", required:true
    },
    name:{
        type: String,
        required: true
    },
    origin:{
        type: String,
    },
    flavourProfile:{
        type: mongoose.Schema.Types.ObjectId, ref:"RecipeSchema",
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("CoffeeProfile", CoffeeProfile);
