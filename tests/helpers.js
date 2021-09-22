const { getJwtToken } = require("../src/modules/auth/utils");
const User = require("../src/models/User");

exports.getTestToken = async () => {
    let user;
    user = await User.findOne({});
    if (!user) {
        user = await User.create({
            firstname: "Olumide",
            lastname: "Nwosu",
            password: "password",
            email: "olumidenwosu@gmail.com"
        });
    }
    return getJwtToken(user.toObject());
}

exports.getAnotherTestToken = async () => {
    let users;
    users = await User.find({});
    if (users.length <= 1) {
        let user = await User.create({
            firstname: "Olumide",
            lastname: "Nwosu",
            password: "password",
            email: "olumidenwosu2@gmail.com"
        });
        return getJwtToken(user.toObject());
    }
    return getJwtToken(users[1].toObject());
}