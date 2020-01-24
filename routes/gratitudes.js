const express = require("express")
const router = express.Router()
const gratitudeController = require("../controllers/gratitudeController")

router.post("/new", gratitudeController.newGratitude)
router.get("/list", gratitudeController.listGratitudes)
router.get("/:id", gratitudeController.findGratitude)
router.put("/:id/edit", gratitudeController.updateGratitude)
router.delete("/:id/delete", gratitudeController.deleteGratitude)


module.exports = router



