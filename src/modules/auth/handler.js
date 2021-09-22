const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { getJwtToken } = require("./utils");
const { SALT_ROUNDS, JWT_SECRET } = require("../../config");

class AuthHandler {

    static async Register(request, h) {
        try {
            const { payload } = request;
            if(await User.findOne({ email: payload.email })) {
                return Boom.badRequest('User already exists.');
            }            
            payload.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
            let user = await User.create(payload);
            user = user.toObject();
            Reflect.deleteProperty(user, "password");
            const token = getJwtToken(user);
            return h.response({
                message: "Registration successful.",
                data: { token, user }
            }).code(201);
        } catch (error) {
            return Boom.internal(error.message);
        }
    }

    static async Login(request, h) {
        try {
            const { email, password } = request.payload;
            let user = await User.findOne({ email });
            if(!user) {
                return Boom.notFound('User not found.');
            }
            if(await bcrypt.compare(password, user.password)) {
                user = user.toObject();
                Reflect.deleteProperty(user, "password");
                const token = getJwtToken(user);
                return h.response({
                    message: "Sign In successful.",
                    data: { token }
                }).code(200);
            }
            return Boom.badRequest('Password is invalid.');
        } catch (error) {
            console.log(error);
            return Boom.internal(error);
        }
    }
}

module.exports = AuthHandler;