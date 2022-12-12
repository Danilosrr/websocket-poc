import jwt from "jsonwebtoken";
import { conflictError, forbiddenError } from "../Middlewares/errorHandler.js";
import Cryptr from "cryptr";
import { userRepository } from "../Repositories/user.repository.js";
import { createUser } from "../Interfaces/user.interface.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

function encrypt(password: string) {
  const encryptedPassword = cryptr.encrypt(password);
  return encryptedPassword;
}

function compare(password: string, encryptedPassword: string) {
  const decryptedPassword = cryptr.decrypt(encryptedPassword);
  if (decryptedPassword === password) return true;
  else return false;
}

async function signUpService(newUser: createUser) {
  const { username, password } = newUser;

  const userFound = await userRepository.findByUsername(username);
  if (userFound) throw conflictError("username not available");

  const createUser = await userRepository.createUser({
    username,
    password: encrypt(password),
  });

  return;
}

async function signInService(login: createUser) {
  const { username, password } = login;

  const userFound = await userRepository.findByUsername(username);
  if (!userFound) throw forbiddenError("incorrect password or username");

  const passwordMatch = compare(password, userFound.password);
  if (!passwordMatch) throw forbiddenError("incorrect password or username");

  const token = jwt.sign({ username, id: userFound.id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  
  return { token: token };
}

export const userServices = {
  compare,
  signInService,
  signUpService
};