import io from "socket.io-client";

const backendURL = "http://localhost:4000"

const socket = io(backendURL);

export default socket;