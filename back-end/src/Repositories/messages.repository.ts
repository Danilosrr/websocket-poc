import { Messages } from "@prisma/client";
import { prisma } from "../Config/database.js";

export type Message = Omit<Messages, "id">

async function createMessage(message: Omit<Messages, "id" | "createdAt">) {
  return await prisma.messages.create({
    data: message,
  });
}

async function getRoomMessages(room: string) {
  return await prisma.messages.findMany({
    where: { room },
  });
}

export const messagesRepository = {
  createMessage,
  getRoomMessages,
};
