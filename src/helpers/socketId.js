import { io } from "socket.io-client";

export const SocketId = {
  wait: io.connect(process.env.REACT_APP_SERVER),
  game: io.connect(process.env.REACT_APP_SERVER),
};
