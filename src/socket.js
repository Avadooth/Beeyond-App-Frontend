// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://51.20.157.181", {
  path: "/socket.io",
  transports: ["websocket"],
});

export default socket;
