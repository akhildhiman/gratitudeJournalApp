const Gratitude = require("../models/Gratitude")
const User = require("../models/User")

module.exports = {
  newGratitude: (req, res) => {
      
    const data = {
      gratitudeTitle: req.body.gratitudeTitle,
      gratitudeDescription: req.body.gratitudeDescription,
      user: req.user.userId
    }

    Gratitude.create(data, (err, newGratitude) => {
      console.log(data, "data")
      if (err) {
        return res.status(500).json({ error: err })
      } else if (!newGratitude) {
        return res.status(400).json({ message: "No gratitude found" })
      } else if (newGratitude) {
        User.findById(req.user.userId, (err, user) => {
          user.gratitudes.push(newGratitude._id) //pushing posts documnet objectid to the post array of the user document
          user
            .save()
            .then(() => {
              return res.json(200).json({ user })
            })
            .catch(err => {
              return res.status(500).json({ error: err })
            })
        })
      }
    })
  },

  // listGratitudes:  (req, res) => {
  //     console.log("inside listGratitudes")
  //     Gratitude.find({}, async (error, gratitudes) => {
  //         if (error) {
  //             return res.status(500).json({ error: "something went wrong" })
  //         } else if (!gratitudes) {
  //             return res.status(400).json({ msg: "sorry no gratitudes" })
  //         } else if (gratitudes) {
  //             gratitudes = await Gratitude.populate(gratitudes, {
  //               path: 'user',
  //               model: 'User'
  //             });
  //             return res.status(200).json({ gratitudes })
  //         }
  //     })
  // },

  listGratitudes: async (req, res) => {
    try {
      const gratitudes = await Gratitude.find({}).populate("user")

      if (!gratitudes) {
        return res.status(400).json({ msg: "sorry no gratitudes" })
      }

      return res.status(200).json({ gratitudes })
    } catch (err) {
      return res.status(500).json({ error: "Server error" })
    }
  },

  // listGratitudes: () => {
  //     Gratitude
  //     .find({})
  //         .populate("users")
  //             .exec(function(err, users) {
  //         if (err) console.log(err)
  //         else console.log(users)
  //     })
  // },

  findGratitude: (req, res) => {
    Gratitude.findById(req.params.id, (err, gratitude) => {
      if (err) {
        return res.status(500).json({ error: "Server error occurred" })
      } else if (!gratitude) {
        return res.status(400).json({ message: "No gratitude found" })
      } else if (gratitude) {
        return res.status(200).json({ gratitude: gratitude })
      }
    })
  },

  updateGratitude: (req, res) => {
    const gratitude = {
      title: req.body.title,
      description: req.body.description
    }

    console.log("update gratitude")
    Gratitude.findByIdAndUpdate(
      req.params.id,
      gratitude,
      { new: true },
      (err, updatedGratitude) => {
        if (err) {
          return res.status(500).json({ error: "Server error occurred" })
        } else if (!updatedGratitude) {
          return res.status(400).json({ message: "No gratitude found" })
        } else if (updatedGratitude) {
          return res.status(200).json({ gratitude: updatedGratitude })
        }
      }
    )
  },

  deleteGratitude: (req, res) => {
    Gratitude.findByIdAndDelete(req.params.id, (err, deletedGratitude) => {
      if (err) {
        return res.status(500).json({ error: "Server error occurred" })
      } else if (!deletedGratitude) {
        return res.status(400).json({ message: "No gratitude found" })
      } else if (deletedGratitude) {
        return res.status(200).json({ gratitude: deletedGratitude })
      }
    })
  }
}
