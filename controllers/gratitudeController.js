const Gratitude = require("../models/Gratitude")
const User = require("../models/User")
const mongoose = require("mongoose")

module.exports = {
  newGratitude: async (req, res, next) => {
    try {
      const gratitudeData = {
        gratitudeTitle: req.body.gratitudeTitle,
        gratitudeDescription: req.body.gratitudeDescription,
        user: req.user.userId,
      }
      const gratitude = await Gratitude.create(gratitudeData)
      if (!gratitude) {
        return res.status(404).json({ error: "No gratitude found" })
      }
      const user = await User.findById(req.user.userId)
      user.gratitudes.push(gratitude._id) //pushing gratitude document's objectid to the user's gratitude array
      user.save().then(() => {
        return res.status(200).json({ user })
      })
    } catch (error) {
      return next(error)
    }
  },

  listGratitudes: async (req, res, next) => {
    try {
      const gratitudes = await Gratitude.find({}).populate("user")
      if (!gratitudes) {
        return res.status(404).json({ error: "No gratitudes found" })
      }
      return res.status(200).json({ gratitudes })
    } catch (err) {
      return next(error)
    }
  },

  getGratitude: async (req, res) => {
    try {
      const gratitude = await Gratitude.findById(req.params.id)
      if (!gratitude) {
        return res.status(404).json({ message: "No gratitude found " })
      }
      return res.status(200).json({ gratitude })
    } catch (error) {
      return next(error)
    }
  },

  editGratitude: async (req, res, next) => {
    try {
      const gratitudeData = {
        gratitudeTitle: req.body.gratitudeTitle,
        gratitudeDescription: req.body.gratitudeDescription,
      }
      const gratitude = await Gratitude.findByIdAndUpdate(
        req.params.id,
        gratitudeData,
        { new: true }
      )
      if (!gratitude) {
        return res.status(404).json({ message: "No gratitude found " })
      }
      return res.status(200).json({ gratitude })
    } catch (error) {
      return next(error)
    }
  },

  deleteGratitude: async (req, res) => {
    try {
      const gratitude = await Gratitude.findByIdAndDelete(req.params.id)
      if (!gratitude) {
        return res.status(200).json({ error: "No gratitude found" })
      }
      await User.updateOne(
        { _id: mongoose.Types.ObjectId(gratitude.user) },
        { $pull: { gratitudes: mongoose.Types.ObjectId(gratitude._id) } }
      )
      res.status(200).json({ gratitude })
    } catch (error) {
      console.log(error)
    }
  },
}
