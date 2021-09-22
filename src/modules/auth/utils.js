const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

exports.getJwtToken = (user) => {
    return jwt.sign(
        user,
        JWT_SECRET,
        {  expiresIn: '1d' },
    );
}