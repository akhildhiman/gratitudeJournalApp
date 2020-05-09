const User = require("../models/User")
const auth = require("../utils/auth")
const validator = require("validator")
const bcrypt = require("bcrypt")

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        throw res
          .status(400)
          .json({ message: "User with this email already exists" })
      }
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

      const newUser = await User.create({ username, email, password })
      if (!newUser) {
        return res.status(404).json({ error: "No user found " })
      }
      return res.status(200).json({ newUser })
    } catch (error) {
      return next(error)
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body
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
        return res.status(401).json({ message: "Incorrect password" })
      }
      const token = auth.signToken({ userId: user._id })

      res.status(200).json({ user, token })
    } catch (error) {
      return next(error)
    }
  },

  identifyUser: async (req, res, next) => {
    try {
      const userId = req.user.userId

      const user = await User.findOne({ _id: userId })
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
