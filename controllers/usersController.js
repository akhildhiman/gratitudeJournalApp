const User = require("../models/User")
const auth = require("../utils/auth")
const validator = require("validator")
const Gratitude = require("../models/Gratitude")
const bcrypt = require("bcrypt")
const moment = require("moment")


module.exports = {
  registerUser: async (req, res, next) => {
    try {
      var { username, email, password } = req.body
      if (password) {
        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password, salt)
      }
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Username, email and password are must" })
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invaid email" })
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password should be of at least 6 characters" })
      }
      const user = await User.create({ username, email, password })
      if (!user) {
        return res.status(404).json({ error: "No user found " })
      }
      return res.status(200).json({ user })
    } catch (error) {
      return next(error)
    }
  },

  loginUser: async (req, res, next) => {
    try {
      console.log("inside login controller")
      const { email, password } = req.body
      // console.log("password on loginuser", password)
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are must" })
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" })
      }
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ message: "This email does not exist" })
      }
      if (!user.confirmPassword(password)) {
        // console.log("Password in login controller", password)
        return res.status(401).json({ message: "Incorrect password" })
      }
      const token = auth.signToken({ userId: user._id })
      // const token = auth.signToken({ email })

      res.status(200).json({ user, token })
    } catch (error) {
      return next(error)
    }
  },

  identifyUser: async (req, res, next) => {
    try {
      // console.log("6-> inside identify user")
      // console.log("7->","user object", req.user)
      console.log(req.user)
      const userId = req.user.userId
      // console.log("8-> loggedin user's id", email)
      // console.log("8-> loggedin user's id", userId)
      // console.log("User.findOne({ _id: userId }-> finding the user having above userId with the key of _id from the database")
      const user = await User.findOne({ _id: userId })
      // console.log("identified user->", user)
      if (!user) {
        return res.status(500).json({ error: "No user found " })
      }
      return res.status(200).json({ user })
    } catch (error) {
      return next(error)
    }
  },

  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      return res.status(200).json({ user })
    } catch (error) {
      return next(error)
    }
  },

  listUsers: async (req, res, next) => {
    try {
      const users = await User.find({})
      if (!users) {
        return res.status(404).json({ message: "No users found" })
      }
      return res.status(200).json({ users })
    } catch (error) {
      return next(error)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
      const user = await User.findByIdAndUpdate(req.params.id, userData, {
        new: true,
      })
      if (!user) {
        return res.status(400).json({ error: "No user found" })
      }
      return res.status(200).json({ user })
    } catch (error) {
      return next(error)
    }
  },

  deleteUser: async (req, res, next) => {
    console.log("inside delte user")
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.status(200).json({ error: "No user found" })
      }
      return res.status(200).json({ user })
    } catch (error) {
      return next(error)
    }
  },

  getUserGratitudes: async (req, res) => {
    // console.log("inside get user gratitudes")
    try {
      const user = await User.findById(req.params.id).populate("gratitudes")
      if (!user) {
        return res.status(400).json({ error: "No user" })
      }
      return res.status(200).json({ userGratitudes: user.gratitudes })
    } catch (error) {
      // return res.json({ error })
      console.log(error) // TODO: why the above line was throwing `res.json` is not a function
    }
  },
}
