import { Router } from "express";
import { chatController } from "../Controllers/chat.controller.js";
import validateToken from "../Middlewares/validateToken.js";

const chatRouter = Router();

chatRouter.post("/chat/connect", validateToken, chatController.enterChat);

export default chatRouter;
