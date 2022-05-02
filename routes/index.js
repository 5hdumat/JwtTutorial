const { Router } = require("express");
const router = Router();

const { authRouter, userRouter } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.use("/auth", authRouter);

router.use("/user", authMiddleware);
router.use("/user", userRouter);

module.exports = router;
