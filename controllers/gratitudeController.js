const Gratitude = require("../models/Gratitude")
const User = require("../models/User")

module.exports = {
  newGratitude: async (req, res, next) => {
  console.log("inside new gratitude")
    try {
      const gratitudeData = {
        gratitudeTitle: req.body.gratitudeTitle,
        gratitudeDescription: req.body.gratitudeDescription,
        user: req.user.userId
      }
      console.log(gratitudeData)
      const gratitude = await Gratitude.create(gratitudeData)
      if (!gratitude) {
        return res.status(404).json({ error: "No gratitude found" })
      }
      const user = await User.findById(req.user.userId)
      console.log("USER", user)
      user.gratitudes.push(gratitude._id) //pushing posts document objectid to the user's post array
      user
        .save()
          .then(() => {
            return res.json(200).json( { user })
        })
    } catch(error) {
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
        return res.status(404).json({ message: "No gratitude found "})
      }
      return res.status(200).json({ gratitude })
    } catch(error) {
      return next(error)
    }
  },
      
  updateGratitude: async (req, res, next) => {
    try {
      const gratitudeData = {
        title: req.body.title,
        description: req.body.description
      }
      const gratitude = await Gratitude.findByIdAndUpdate(req.params.id, gratitudeData, { new: true })
      if (!gratitude) {
        return res.status(404).json({ message: "No gratitude found "})
      }
      return res.status(200).json({ gratitude })
    } catch(error) {
      return next(error)
    }
  },

  deleteGratitude: async (req, res, next) => {
    try {
      const gratitude = await Gratitude.findByIdAndDelete(req.params.id)
      if (!gratitude) {
        return res.status(200).json({ error: "No gratitude found"})
      }
      return res.status(200).json({ gratitude })
    } catch(error) {
        return res.json({ error })
    }
  }
}






