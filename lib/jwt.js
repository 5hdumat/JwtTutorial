const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};

exports.verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err)
                reject({
                    status: 403,
                    message: "유효하지 않은 인증토큰 입니다.",
                });

            resolve(decoded);
        });
    });
};
