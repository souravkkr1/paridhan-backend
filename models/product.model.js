const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: String,
        img: String,
        price: Number,
        discPrice: Number,
        color: String,
        category: String,
        tags: String,
        stocks: Number
    }
)

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };