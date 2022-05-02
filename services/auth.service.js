const { User } = require("../models");
const { crypto, jwt } = require("../lib");

exports.login = async (userDto) => {
    const { username, password } = userDto;

    const user = await User.findOne({ username });
    const account = validatePassword(user.password, crypto.hash(password));

    if (account) {
        const payload = {
            _id: user._id,
            username: user.username,
            admin: user.admin,
        };

        return await jwt.generateToken(payload);
    }

    return false;
};

const validatePassword = (hashedPassword, password) => {
    console.log(hashedPassword);
    console.log(password);
    return hashedPassword == password;
};
