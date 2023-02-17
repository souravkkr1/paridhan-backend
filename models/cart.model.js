const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
    {
        items: [
            {
              product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
              },
              quantity: {
                type: Number,
                required: true
              }
            }
          ],
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          createdAt: {
            type: Date,
            default: Date.now
          },
          updatedAt: {
            type: Date,
            default: Date.now
          }
    }
)

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };