const User = require("../models/User")
const auth = require("../utils/auth")
const validator = require("validator")
const Gratitude = require("../models/Gratitude")
const mongoose = require("mongoose")


module.exports = {

    registerUser: (req, res) => {
        console.log("inside register user")
        const { username, email, password } = req.body
        User.create(req.body, (err, createdUser) => {
            if (err) {
                return res.status(500).json({ error: "Server error occurred" })
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
            const token = auth.signToken({ userId: user._id })
            // const token = auth.signToken({ email })

            res.status(200).json({ user, token })
            // next()
        })
    },

    identifyUser: (req, res, next) => {
        console.log("6-> inside identify user")
        console.log("7->","user object", req.user)
        const userId = req.user.userId
        // console.log("8-> loggedin user's id", email)
        console.log("8-> loggedin user's id", userId)
        console.log("User.findOne({ _id: userId }-> finding the user having above userId with the key of _id from the database")
        User.findOne({ _id: userId }, (err, user) => {
            console.log("identified user->", user)
            if (err) return next(err)
            return res.json({ user })
        })
    },

    getUser: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                return res.status(500).json({ error: "Server error occurred" })
            } else if (!user) {
                return res.status(404).json({ message: "User not found" })
            } else if (user) {
                return res.status(200).json({ user: user })
            }
        })
    },

    listUsers: (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                return res.status(500).json({ error: "Server error occurred" })
            } else if (!users) {
                return res.status(400).json({ error: "No users found" })
            } else if (users) {
                return res.status(200).json({ users: users })
            }
        })
    },

    // listUsers: (req, res) => {


    // }



    updateUser: (req, res) => {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.findOneAndUpdate(req.params.id, user, { new: true }, (err, updatedUser) => {
            console.log(updatedUser)
            if (err) {
                return res.status(500).json({ error: "Server error occurred" })
            } else if (!updatedUser) {
                return res.status(400).json({ error: "No user found" })
            } else if (updatedUser) {
                return res.status(200).json({ user: updatedUser })
            }
        })
    },

    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id,(err, deleteduser) => {
            if (err) {
                return res.status(500).json({ error: "Server error occurred" })
            } else {
                return res.status(200).json({ user: deleteduser })
            }
        })
    },

    // getUserGratitudes: (req, res) => {
    //     console.log("inside get user gratitudes")
    //     const id = mongoose.Types.ObjectId(req.user.userId);
    //     console.log(id)
    //     // console.log(typeof(id))
    //     Gratitude.find({user: id}, (error, gratitudes) => {
    //         // console.log(typeof(id))
    //         console.log("current user id", req.user.userId) 
    //         if (error) console.log(error)
    //         console.log(
    //             // "currentUser->", req.user,
    //             "gratitudes by this user->", gratitudes
    //         )
    //       } 
    //     )
    // }

    // getUserGratitudes: (req, res) => {
    //     console.log(req.params.id)
    //     console.log()
    //     User.findById(req.params.id).populate("gratitudes").exec((err, gratitudes) => {
    //         if (err) console.log(err)
    //         console.log(gratitudes)
    //     })
    // }

//     getUsersWithGratitudes: (req, res) => {
//         User.find({}).populate("gratitudes"), (err, users) => {
//             if (err) console.log(err)
//             console.log(users)
//         }
//     }
// }
}
