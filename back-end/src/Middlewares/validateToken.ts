import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { badRequestError, unauthorizedError } from "./errorHandler.js";
import { userRepository } from "../Repositories/user.repository.js";
import { token } from "../Interfaces/user.interface.js";

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const secretKey = process.env.JWT_KEY;

  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) throw unauthorizedError("missing token");

  const verify = jwt.verify(token, secretKey, function (err) {
    if (err) throw unauthorizedError("invalid token");
  });

  const tokenObj = jwt.decode(token) as token;

  const user = await userRepository.findByUsername(tokenObj.username);
  if (!user) throw badRequestError("mismatched values");

  const infoMatch = tokenObj.id === user.id;
  if (!infoMatch) throw badRequestError("mismatched values");

  res.locals.token = tokenObj;

  next();
}
