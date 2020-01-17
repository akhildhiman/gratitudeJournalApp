const Gratitude = require("../models/Gratitude")

module.exports = {

    createGratitude: (req, res) => {
        Gratitude.create(req.body, (err, createdGratitude) => {
            if (err) {
                return res.status(404).json({ error: "No gratitude found" })
            } else {
                return res.status(200).json({ gratitude: createdGratitude })
            }
        })
    },

    updateGratitude: (req, res, next) => {
        Gratitude.findByIdAndUpdate(req.params.id, (err, updatedGratitude) => {
            if (err) {
                return res.status(404).json({ error: "No gratitude found" })
            } else {
                return res.status(200).json({ gratitude: updatedGratitude })
            }
        })
    },

    deleteGratitude: (req, res, next) => {
        Gratitude.findByIdAndDelete(req.params.id, (err, deletedGratitude) => {
            if (err) {
                return res.status(400).json({error: "No gratitude found"})
            } else {
                return res.status(200).json({ gratitude: deletedGratitude })
            }
        })
    }
}

