var express = require("express")
var router = express.Router()
const sequelize = require("../db/mysql")

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    res.json("ok")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    res.json("not ok")
  }
})

module.exports = router
