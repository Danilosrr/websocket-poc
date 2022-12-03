import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
import handleErrors from "./Middlewares/errorHandler.js";
import router from "./Routers/routers.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleErrors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true
});

export { server, io };