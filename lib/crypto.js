const crypto = require("crypto");

exports.hash = async (password) => {
    return crypto
        .createHmac("sha256", process.env.SECRET_KEY)
        .update(password)
        .digest("hex");
};
