import { io } from "./app.js";
import {
  Message,
  messagesRepository,
} from "./Repositories/messages.repository.js";
import { roomRepository } from "./Repositories/room.repository.js";
import { userRepository } from "./Repositories/user.repository.js";

io.on("connection", (socket) => {
  console.log("running");

  socket.on("select_room", async (data, callback) => {
    const { room, username } = data;

    const findUser = await userRepository.findByUsername(username);
    const findRoom = await roomRepository.findByName(room);
    if (!findUser && !findRoom) return;

    socket.join(room);

    const messagesRoom = await messagesRepository.getRoomMessages(room);
    callback(messagesRoom);
  });

  socket.on("message", async ({ room, username, text }) => {
    const message: Message = {
      room,
      username,
      text,
      createdAt: new Date()
    };

    await messagesRepository.createMessage(message);

    io.to(room).emit("message", message);
  });
});
