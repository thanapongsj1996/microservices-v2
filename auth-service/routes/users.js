const express = require("express")
const router = express.Router()
const User = require("../models/user")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const { authenticate } = require("../middlewares/passport-jwt")

// localhost:4000/api/v1/users/
router.get("/", function (req, res, next) {
  return res.status(200).json({
    message: "Hello Users",
  })
})

// localhost:4000/api/v1/users/register
router.post("/register", async function (req, res, next) {
  const { fullname, email, password } = req.body

  const user = await User.findOne({ where: { email } })
  if (user) return res.status(400).json({ message: "Email already exists" })

  const hashedPassword = await argon2.hash(password)
  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
  })

  return res.status(200).json({
    message: "Register Success",
    user: {
      id: newUser.id,
      fullname: newUser.fullname,
    },
  })
})

// localhost:4000/api/v1/users/login
router.post("/login", async function (req, res, next) {
  const { email, password } = req.body

  // check user exists
  const user = await User.findOne({ where: { email } })
  if (!user)
    return res.status(400).json({ message: "Email or Password not correct" })

  // check password is correct
  const isPasswordCorrect = await argon2.verify(user.password, password)
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Email or Password not correct" })

  // generate token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  )

  return res.status(200).json({
    message: "Login User",
    accessToken: token,
  })
})

// localhost:4000/api/v1/users/profile
router.get("/profile", [authenticate], async function (req, res, next) {
  const user = await User.findByPk(req.user.userId)

  return res.status(200).json({
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  })
})

module.exports = router
