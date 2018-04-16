import koa from "koa";
import http from "http";
import Io from "socket.io";

const port = process.env.PORT || 2333;

const app = new koa();
const server = http.createServer(app.callback());
const io = Io(server);

io.on("connection", socket => {
  socket.on("mhr-devtools-init", () => {
    socket.broadcast.emit("mhr-devtools-init");
  });
  socket.on("mhr-message", data => {
    socket.broadcast.emit("mhr-message", data);
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
