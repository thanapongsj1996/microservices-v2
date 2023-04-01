const { DataTypes } = require("sequelize")
const sequelize = require("../db/mysql")

const User = sequelize.define(
  "User",
  {
    fullname: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "member",
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
)

module.exports = User
