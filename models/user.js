const { Schema, model } = require("mongoose");

const hash = async (password) => {
    return crypto
        .createHmac("sha256", process.env.SECRET_KEY)
        .update(password)
        .digest("hex");
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const User = model("user", UserSchema);

module.exports = { User };
