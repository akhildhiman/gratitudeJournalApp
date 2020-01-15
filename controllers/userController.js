const User = require("../models/User")
const auth = require("../utils/auth")

module.exports = {

    registerUser: (req, res, next) => {
        User.create(req.body, (err, createdUser) => {
            if (err) {
                return next(err)
            } else {
                return res.status(200).json({ user: createdUser })
            }
        })
    }


    loginUser: (req, res, next) => {
        const { email, password } = req.body
        User.findOne({ email }, (err, user) => {
            if (err) {
                return next(err)
            } else if (!user) {
                return res.status(402).json({ error: "User not found" })
            } else if (!user.confirmPassword(password)) {
                return res.status(402).json({ error: "Incorrect password" })
            }

            // generate token here
            const token = auth.signToken(email)
            res.status(200).json({ user, token })
        })
    }
}