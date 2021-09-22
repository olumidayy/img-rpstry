const AuthHandler = require("../auth/handler");
const { validateSignIn, validateSignUp } = require("./validate");

const PREFIX = "/api/auth";

module.exports = (server) => {

    const routes = [

        server.route({
            method: 'POST',
            path: `${PREFIX}/register`,
            options: {
                auth: false,
                description: 'Registers a user.',
                handler: AuthHandler.Register,
                validate: validateSignUp
            }
        }),

        server.route({
            method: 'POST',
            path: `${PREFIX}/login`,
            options: {
                auth: false,
                description: 'Signs in a user.',
                handler: AuthHandler.Login,
                validate: validateSignIn
            }
        })
    ];

    return routes;
};