import io from "socket.io-client";

const { host = "http://localhost", port = 2333 } = {};

let fullHost = `${host}:${port}`;

const socket = io(fullHost);

socket.on("connect", () => {
  console.log("connect");
});

socket.on("disconnect", () => {
  socket.disconnect();
  console.log("disconnect");
});
socket.emit("mhr-devtools-init");
