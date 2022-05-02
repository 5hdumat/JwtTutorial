const { jwt } = require("../lib");

exports.authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.headers["x-access-token"];

        if (!accessToken) {
            return res.status(403).send({
                status: 403,
                message: "유효하지 않은 인증토큰 입니다.",
            });
        }

        const decoded = await jwt.verify(accessToken);
        req.decoded = decoded;

        next();
    } catch (e) {
        if (e.status) {
            return res
                .status(e.status)
                .json({ status: e.status, success: false, message: e.message });
        }

        return res.status(400).json({ status: 400, message: e.message });
    }
};
