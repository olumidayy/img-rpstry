const AuthModule = require("./auth/routes");
const ImageModule = require("./images/routes");

module.exports = (server) => {
    AuthModule(server);
    ImageModule(server);
}