const { Router } = require("express");
const authRouter = Router();
const { authService, userService } = require("../services");

authRouter.post("/register", async (req, res) => {
    try {
        const { username, password, admin } = req.body;

        const user = await userService.findUsername(username);

        if (user) {
            return res.status(409).json({
                status: 409,
                message: "이미 존재하는 username 입니다.",
            });
        }

        let userDto = {};
        userDto.username = username;
        userDto.password = password;

        if (admin) userDto.admin = admin;

        await userService.create(userDto);

        return res.status(201).json({
            status: 201,
            message: "회원이 정상적으로 등록되었습니다.",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userService.findUsername(username);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "존재하지 않는 username 입니다.",
            });
        }

        let userDto = {};
        userDto.username = username;
        userDto.password = password;

        const account = await authService.login(userDto);

        if (account === false) {
            return res.status(403).send({
                status: 403,
                message: "로그인 정보가 일치하지 않습니다.",
            });
        }

        return res.send({
            status: 200,
            message: "정상적으로 로그인되었습니다.",
            access_token: account,
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});

module.exports = { authRouter };
