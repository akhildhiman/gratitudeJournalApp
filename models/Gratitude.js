const mongoose = require("mongoose")
const Schema = mongoose.Schema
var slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const gratitudeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    slug: { type: "String", slug: "title", unique: true }
}, { timestamps: true })


const Gratitude = mongoose.model("Gratitude", gratitudeSchema)

module.exports = Gratitude


