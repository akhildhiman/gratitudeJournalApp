const User = require("../models/User")
const auth = require("../utils/auth")
const validator = require("validator")


module.exports = {

    registerUser: (req, res, next) => {
        const { username, email, password } = req.body
        User.create(req.body, (err, createdUser) => {
            if (err) {
                return next(err)
            } else if (!username || !email || !password) {
                return res.status(400).json({ message: "Username, email and password are must" })
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
        console.log("login controller")
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are must" })
        }

        User.findOne({ email }, (err, user) => {
            if (err) {
                return next(err)
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
            next()
        })
    },

    verifyUser: (req, next) => {
        console.log("inside verifyuser", req.headers.authorization)
        const token = req.headers.token 
        const userEmail = auth.verifyToken(token)
        const user = User.find({ email: userEmail })
        console.log(user)
        next()
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
    },


    listUsers: (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                return res.status(404).json({ error: "No users found" })
            } else {
                return res.status(200).json({ user: user })
            }
        })
    }
}