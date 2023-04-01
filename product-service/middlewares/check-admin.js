module.exports.checkAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next()
    } else {
      return res.status(403).json({
        message: "Admin only",
      })
    }
  } catch (err) {
    next(err)
  }
}
