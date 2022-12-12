import { useEffect } from "react";
import socket from "../config/socket";

function useEventSubscription(event, listener) {
  useEffect(() => {
    socket.on(event, listener);
    return () => socket.off(event);
  }, [event, listener]);
}

async function connectRoom({ username, room }, setMessage) {
  socket.emit(
    "select_room",
    {
      username,
      room,
    },
    (response) => {
      setMessage(response);
    }
  );
}

export const socketApi = {
  useEventSubscription,
  connectRoom,
};
