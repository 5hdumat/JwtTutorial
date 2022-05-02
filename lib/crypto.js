const crypto = require("crypto");

exports.hash = (password) => {
    return crypto
        .createHmac("sha256", process.env.SECRET_KEY)
        .update(password)
        .digest("base64");
};
