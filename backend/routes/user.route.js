const express = require("express")
const userController = require("../controllers/user.controller")

const router = express.Router()

router.post("/register", userController.Register)
router.post("/login", userController.Login)


module.exports = router