const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    country: { type: String, required: true},
    isAdmin: { type: Boolean, default: false}
}, { timestamps: true })


const User = mongoose.model("User", userSchema)

module.exports = User