const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  dialect: "mysql",
})

module.exports = sequelize
