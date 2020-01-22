const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController")
const auth = require("../utils/auth")
// const emailController = require("../controllers/emailController")

router.post("/register", usersController.registerUser)
router.post("/login", usersController.loginUser)
router.get("/me", usersController.verifyUser)
router.get("/:userId", usersController.getUser)
router.get("/list", usersController.listUsers)
// console.log(usersController.verifyUser)
// router.post("/user/:email", emailController.sendPasswordResetEmail)
// router.post("/receive_new_password/:userId/:token", emailController.receiveNewPassword)


module.exports = router;
 