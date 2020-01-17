const User = require("../models/User")
const auth = require("../utils/auth")
const validator = require("validator")

module.exports = {

    registerUser: (req, res, next) => {
        const { name, email, password } = req.body
        User.create(req.body, (err, createdUser) => {
            if (err) {
                return next(err)
            } else if (!name || !email || !password) {
                return res.status(400).json({ message: "Name, email and password are must" })
            } else if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Invaid email" })
            } else if (password.length < 6) {
                return res.status(400).json({ message: "Password should be of at least 6 characters" })
            }
            else {
                return res.status(200).json({ user: createdUser })
            }
        })
    },

    loginUser: (req, res, next) => {
        const { email, password } = req.body
        User.findOne({ email }, (err, user) => {
            if (err) {
                return next(err)
            } else if (!user || !password) {
                return res.status(400).json({ message: "Email and password are must" })
            } else if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Invalid email" })
            } else if (!user) {
                return res.status(402).json({ error: "User not found" })
            } else if (!user.confirmPassword(password)) {
                return res.status(402).json({ error: "Incorrect password" })
            }

            // generate token here
            const token = auth.signToken(email)
            res.status(200).json({ user, token })
        })
    },


    getUser: (req, res, next) => {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                return next(err)
            } else if (!user) {
                return res.status(404).json({ message: "User not found" })
            } else {
                return res.status(200).json({ user: user })
            }
        })
    }
}