const expres = require("express")
const router = expres.router()
const gratitudeController = require("../controllers/gratitudeController")

router.post("/new", gratitudeController.newGratitude)
router.get("/list", gratitudeController.listGratitudes)
router.get("/:gratitudeId", gratitudeController.findGratitude)
router.put("/:gratitudeId", gratitudeController.updateGratitude)
router.delete("/:gratitudeId", gratitudeController.deleteGratitude)


module.exports = router



