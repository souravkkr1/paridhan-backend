const express = require("express")

const userRouter = express.Router();

userRouter.post("/signin")
userRouter.post("/signup")
userRouter.get("/allUsers")
userRouter.get("/profile")
userRouter.delete("/delete/:id")
userRouter.patch("/edit/:id")

module.exports = {
    userRouter
}