const { User } = require("../models");
const { crypto } = require("../lib");

exports.findUsername = async (username) => {
    return User.findOne({username});
};

exports.findAll = async () => {
    return User.find().select({_id: 1, username: 1, admin: 1});
};

exports.create = async (userDto) => {
    userDto.password = crypto.hash(userDto.password);
    const user = new User(userDto);

    await user.save();
};
