const { User } = require("../models");
const { crypto } = require("../lib");

exports.findUsername = async (username) => {
    return await User.findOne({ username });
};

exports.create = async (userDto) => {
    userDto.password = await crypto.hash(userDto.password);
    const user = new User(userDto);

    await user.save();
};
