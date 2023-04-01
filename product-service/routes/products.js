const express = require("express")
const router = express.Router()
const { checkAdmin } = require("../middlewares/check-admin")
const { authenticate } = require("../middlewares/passport-jwt")
const Product = require("../models/product")


// localhost:5000/api/v1/products/
router.post("/", [authenticate, checkAdmin], async function (req, res, next) {
  // add product to mongodb
  const { id, name, price, description } = req.body

  const newProduct = await Product.create({
    id,
    name,
    price,
    description,
  })


  return res.status(200).json({
    message: "ok",
  })
})

module.exports = router
