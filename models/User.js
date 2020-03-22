const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, reuired: true },
    password: { type: String, required: true },
    gratitudes:[{ type: Schema.Types.ObjectId, ref: "Gratitude" }]
}, { timestamps: true })


userSchema.pre("save", function (next) {
    if (this.password) {
        console.log("this", this)
        console.log("this.password", this.password)
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

userSchema.methods.confirmPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User