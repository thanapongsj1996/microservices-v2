const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('err : ', err));

const productsRouter = require("./routes/products")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))



// localhost:4000/api/v1/products/
app.use("/api/v1/products", productsRouter)

module.exports = app
