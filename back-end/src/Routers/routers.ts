import { Router } from "express";
import chatRouter from "./chat.router.js";
import userRouter from "./user.router.js";

const router = Router();

router.use(userRouter);
router.use(chatRouter);

export default router;