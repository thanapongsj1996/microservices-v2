const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    collection: "products",
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product