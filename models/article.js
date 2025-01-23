const { required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");

const articlSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    photo: String,
    price: {
        type: Number,
        required: true
    },
    categorie: {
        type: String,
        enum: ['Musculation', 'Nutrition', 'Équipement'],
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

const Article = mongoose.model("Article" ,articlSchema)

module.exports = Article ;