const { Router } = require("express");
const userRouter = Router();
const { userService } = require("../services");

userRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

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

        await userService.create(userDto);

        return res.status(201).json({
            status: 201,
            message: "회원이 정상적으로 등록되었습니다.",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});

module.exports = { userRouter };
