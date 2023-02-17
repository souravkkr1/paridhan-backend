const express = require("express")
const { UserModel } = require("../models/user.model")
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();


userRouter.post("/admin/signup", async (req, res) => {
    const { name, email, pass, role, mobile } = req.body;
    try {
        bcrypt.hash(pass, 6, async (err, hash_pass) => {
            if (err) {
                console.log({ "msg": "Something went wrong" })
            } else {
                const user = new UserModel({ name, email, pass: hash_pass, role, mobile })
                await user.save();
                res.send("Resgistration successful")
            }
        })
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }
})


userRouter.post("/admin/signin", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, async (err, result) => {
                if (!result) {
                    console.log(err);
                    res.send({ "msg": "something went wrong" });
                } else {
                    let token = jwt.sign({ userID: user[0]._id }, process.env.secret);
                    res.send({ "msg": "login successfully", token });
                }
            });
        } else {
            res.send("Try another email");
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
})

userRouter.post("/signup", async (req, res) => {
    const { name, email, pass, role, mobile } = req.body;
    try {
        bcrypt.hash(pass, 6, async (err, hash_pass) => {
            if (err) {
                console.log({ "msg": "Something went wrong" })
            } else {
                const user = new UserModel({ name, email, pass: hash_pass, role, mobile })
                await user.save();
                res.send("Resgistration successful")
            }
        })
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }

})


userRouter.post("/signin", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, async (err, result) => {
                if (!result) {
                    console.log(err);
                    res.send({ "msg": "something went wrong" });
                } else {
                    let token = jwt.sign({ userID: user[0]._id }, process.env.secret);
                    res.send({ "msg": "login successfully", token });
                }
            });
        } else {
            res.send("Try another email");
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
})

userRouter.get("/allUsers")
userRouter.get("/profile")
userRouter.delete("/delete/:id")
userRouter.patch("/edit/:id")

module.exports = {
    userRouter
}