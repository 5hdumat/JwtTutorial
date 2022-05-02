const { Router } = require("express");
const userRouter = Router();
const { userService } = require("../services");

userRouter.get("/", async (req, res) => {
    if (!req.decoded.admin) {
        return res
            .status(403)
            .send({ status: 403, message: "권한이 없습니다." });
    }

    const users = await userService.findAll();

    return res.send({ status: 200, data: users });
});

module.exports = { userRouter };
