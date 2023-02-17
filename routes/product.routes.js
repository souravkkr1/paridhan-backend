const express = require("express");
const productRouter = express.Router();
const { ProductModel } = require("../models/product.model")

// Get all products
productRouter.get('/', async (req, res) => {
    const { category } = req.query
    console.log(category)
    try {
        if (category != undefined) {
            const products = await ProductModel.find({ category });
            res.json(products);
        } else {
            const products = await ProductModel.find();
            res.json(products);
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
});

// Get single product by id
productRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const products = await ProductModel.findOne({ _id: id });
        res.send(products);
        console.log(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
});


// Create product
productRouter.post('/add', async (req, res) => {
    const payload = req.body;
    console.log(payload)
    try {
        const new_product = new ProductModel(payload)
        await new_product.save();
        res.send("Product added successfully")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
});



// Update product by id
productRouter.patch('/:id', async (req, res) => {
    const payload = req.body;
    const {id} = req.params;
    console.log(payload)
    try {
        await ProductModel.findByIdAndUpdate({ _id: id }, payload)
        res.send("Product edited successfully")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
});

// Delete product by id
productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await ProductModel.findByIdAndDelete({ _id: id })
        res.send("Successfull deleted")
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }

});


module.exports = {
    productRouter
}