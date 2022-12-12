import { Request, Response } from "express";
import { token } from "../Interfaces/user.interface.js";

async function enterChat(req: Request, res: Response) {
  const token: token = res.locals.token;

  res.status(200).send({ username: token.username });
}

export const chatController = {
  enterChat,
};
