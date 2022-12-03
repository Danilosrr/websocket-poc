import { io } from "./app.js";

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
}

interface Message {
  room: string;
  text: string;
  username: string;
  createdAt: Date;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("select_room", (data, callback) => {
    const { room, username } = data;

    socket.join(room);

    const userInRoom = users.find(
      (user) => user.username === username && user.username === room
    );

    if (!!userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room,
        username,
        socket_id: socket.id,
      });
    }

    const messagesRoom = getMessagesRoom(room);
    callback(messagesRoom);
  });

  socket.on("message", ({ room, username, text }) => {
    // Salvar mensagens
    const message: Message = {
      room,
      username,
      text,
      createdAt: new Date(),
    };

    messages.push(message);

    // Enviar para os usuarios da sala especifica
    io.to(room).emit("message", message);
    console.log(messages);
  });
});

const getMessagesRoom = (room: string) => {
  const messagesRoom = messages.filter((message) => message.room === room);

  return messagesRoom;
};
