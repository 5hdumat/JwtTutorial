const { User } = require("../models");
const { crypto, jwt } = require("../lib");

exports.check = async (userDto) => {
    const { username, password } = userDto;

    const user = await User.findOne({ username });
    const account = await validatePassword(
        user.password,
        await crypto.hash(password)
    );

    if (account) {
        const payload = {
            _id: user._id,
            username: user.username,
        };

        return await jwt.generateToken(payload);
    }
};

const validatePassword = async (hashedPassword, password) => {
    return hashedPassword == password;
};
