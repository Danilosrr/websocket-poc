import { prisma } from "../Config/database.js";

async function findByName(name: string) {
  return await prisma.rooms.findUnique({
    where: { name },
  });
}

export const roomRepository = {
  findByName,
};
