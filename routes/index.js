const { Router } = require("express");
const router = Router();

const { authRouter, userRouter } = require("../controllers");

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
