const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    country: { type: String, required: true},
    isAdmin: { type: Boolean, default: false}
}, { timestamps: true })


userSchema.pre("save", function(next){
    if (this.password) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

userSchema.methods.confirmPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}


const User = mongoose.model("User", userSchema)

module.exports = User