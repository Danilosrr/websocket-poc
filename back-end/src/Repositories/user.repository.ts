import { PrismaClient, Users } from "@prisma/client";
import { prisma } from "../Config/database.js";

async function findByUsername(username: string) {
  return await prisma.users.findUnique({
    where: { username },
  });
}

async function createUser(user: Omit<Users, "id">) {
  return await prisma.users.create({
    data: user,
  });
}

export const userRepository = {
  findByUsername,
  createUser,
};
