const express = require("express")
const router = express.Router()
const gratitudeController = require("../controllers/gratitudeController")
const auth = require("../utils/auth")

router.post("/new", auth.verifyToken, gratitudeController.newGratitude)
router.get("/list", gratitudeController.listGratitudes)
router.get("/:id", gratitudeController.getGratitude)
router.put("/:id/edit", gratitudeController.updateGratitude)
router.delete("/:id/delete", gratitudeController.deleteGratitude)

module.exports = router
