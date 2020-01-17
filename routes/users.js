const express = require('express');
const User = require("../models/User")
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/:userId", userController.getUser)
// router.put("/:userId", userController.updateUser)


module.exports = router;
 