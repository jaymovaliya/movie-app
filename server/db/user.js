const Users = require("../models/users");

module.exports = () => ({
    get: (username) => {
        return Users.findOne({ email: username});
    },
    create: (username, password) => {
        const user = new Users({
            email: username,
            password: password
        });
        return user.save();
    }
});