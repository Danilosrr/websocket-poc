import { Request, Response } from "express";
import { createUser } from "../Interfaces/user.interface.js";
import { userServices } from "../Services/user.services.js";

async function signIn(req: Request, res: Response) {
  const user: createUser = req.body;

  const token = await userServices.signInService(user);

  res.status(200).send(token);
}

export async function signUp(req: Request, res: Response) {
  const user: createUser = req.body;

  await userServices.signUpService(user);

  res.sendStatus(201);
}

export const userController = {
  signIn,
  signUp,
};
