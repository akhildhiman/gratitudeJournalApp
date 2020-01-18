const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const emailController = require("../controllers/emailController")

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/:userId", userController.getUser)
router.post("/user/:email", emailController.sendPasswordResetEmail)
router.post("/receive_new_password/:userId/:token", emailController.receiveNewPassword)


module.exports = router;
 