const { Router } = require("express");
const authRouter = Router();
const { authService, userService } = require("../services");

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

        const account = await authService.check(userDto);

        console.log(account);
        return account;
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});

module.exports = { authRouter };
