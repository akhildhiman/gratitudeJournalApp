const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, reuired: true },
    password: { type: String, required: true },
    gratitudes:[{ type: Schema.Types.ObjectId, ref: "Gratitude" }]
}, { timestamps: true })


userSchema.methods.confirmPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User