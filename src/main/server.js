import koa from "koa";
import http from "http";
import Menehra from "menhera";
import { IOServer } from "./mhr-socketio";

const port = process.env.PORT || 2333;
const app = new koa();
const server = http.createServer(app.callback());

const _ = new Menehra({
  _mount: {
    IOServer
  }
});
_.$use({
  IOServer: {
    config: {
      server
    },
    on: {
      connection: socket => ({
        "mhr-devtools-init": () => {
          socket.broadcast.emit("mhr-devtools-init");
        },
        "mhr-message": data => {
          socket.broadcast.emit("mhr-message", data);
        }
      })
    }
  }
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
