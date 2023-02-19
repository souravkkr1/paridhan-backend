const express = require("express");
const cartRouter = express.Router();
const { CartModel } = require("../models/cart.model")

cartRouter.post("/", async (req, res) => {
    const user = req.body.userID
    console.log("yo:", req.body)
    const { prodID, quantity } = req.body
    console.log("tt:", prodID)
    try {
        const cart = new CartModel({ product: prodID, quantity, user })
        await cart.save()
        res.send("Product added successfully")
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
    }
})
cartRouter.get("/items", async (req, res) => {
    const user = req.body.userID
    console.log("ls:", user)
    try {
        let data = await CartModel.find({ user }).populate("product")
        console.log(data)
        res.json({ data });
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
    }
})

cartRouter.patch("/items/:id", async (req, res) => {
    const payload = req.body
    const { id } = req.params
    try {
        await CartModel.findByIdAndUpdate({ _id: id }, payload)
        // console.log(data)
        res.json("Updated successfully");
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
    }
})

cartRouter.delete("/items/:id", async (req, res) => {
    const { id } = req.params
    try {
        await CartModel.findByIdAndDelete({ _id: id })
        // console.log(data)
        res.json("Successfully Deleted");
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
    }
})

module.exports = {
    cartRouter
}