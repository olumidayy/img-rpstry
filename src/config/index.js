require("dotenv").config();


module.exports = {
    DB_URL: process.env.DB_URL,

    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),

    JWT_SECRET: process.env.JWT_SECRET,

    CLOUDINARY_SECRET: kj3o_4qfx3129efHL9CXw2v2Boo,
    CLOUDINARY_KEY: 383992744848153,
    CLOUDINARY_NAME: dtjayg0jm
}