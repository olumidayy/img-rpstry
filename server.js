const Hapi = require('@hapi/hapi');
const Boom = require("@hapi/boom");
const HapiAuthJwt = require("hapi-auth-jwt2");
const Joi = require("joi");

const config = require("./src/config");
const { ConnectDB } = require('./src/config/database');
const RegisterRoutes = require("./src/modules");
const User = require("./src/models/User");

const init = async () => {

    try {
        await ConnectDB();
        console.log("Connected to Database.");
    } catch (error) {
        console.log(error);
    }

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(HapiAuthJwt);

    server.auth.strategy('jwt', 'jwt',
        {
            key: config.JWT_SECRET,
            validate: async (decoded, request, h) => {
                if(await User.findById(decoded._id)) {
                    request.user = decoded._id;
                    return { isValid: true }
                }
                return { isValid: false }
        },
            verifyOptions: { ignoreExpiration: true }
        });

    server.auth.default('jwt');

    RegisterRoutes(server);

    server.route({
        method: 'GET',
        path: '/api',
        options: { auth: false },
        handler: (request, h) => {
            return h.response({
                message: "Hello world!"
            }).code(200);
        }
    });

    await server.start();
    console.log('Server running on port 3000');
    return server;
};

module.exports = init;