const express = require("express")
const router = express.Router()
const gratitudeController = require("../controllers/gratitudeController")

router.post("/new", gratitudeController.newGratitude)
router.get("/list", gratitudeController.listGratitudes)
router.get("/:gratitudeId", gratitudeController.findGratitude)
router.put("/:gratitudeId", gratitudeController.updateGratitude)
router.delete("/:gratitudeId", gratitudeController.deleteGratitude)


module.exports = router



