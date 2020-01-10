const mongoose = require("mongoose")

const gratitudeSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })


const Gratitude = mongoose.model("Gratitude", gratitudeSchema)

module.exports = Gratitude


