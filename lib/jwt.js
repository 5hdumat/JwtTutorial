const jwt = require("jsonwebtoken");

exports.generateToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            },
            (error, token) => {
                if (error) reject(error);
                resolve(token);
            }
        );
    });
};
