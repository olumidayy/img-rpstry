require("dotenv").config();


module.exports = {
    DB_URL: process.env.DB_URL,

    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),

    JWT_SECRET: process.env.JWT_SECRET
}