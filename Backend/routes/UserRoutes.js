const express = require("express")
const route = express.Router()
const UserController = require("../controllers/UserController")
const AuthCheck = require("../middlewares/AuthMiddleware")



route.post("/signup", UserController.SignupUser)

route.post("/login",UserController.LoginUser)

route.get("/profile",AuthCheck,UserController.GetUser)


module.exports = route;