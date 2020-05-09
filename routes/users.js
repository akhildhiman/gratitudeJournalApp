const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")
const auth = require("../utils/auth")
const emailController = require("../controllers/emailController")

router.post("/register", usersController.registerUser)
router.post("/login", usersController.loginUser)
router.get("/me", auth.verifyToken, usersController.identifyUser)
router.get("/list", usersController.listUsers)
router.get("/:id", usersController.getUser)
router.put("/:id/edit", usersController.updateUser)
router.delete("/:id/delete", usersController.deleteUser)
router.get("/gratitudes/:id", usersController.getUserGratitudes)
router.post("/forgot-password", emailController.createOneTimeTokenAndSendMail)
router.post("/reset-password/:userId/:token", emailController.resetPassword)
router.post("/send-random-gratitude/:id", emailController.sendRandomGratitude)

module.exports = router
