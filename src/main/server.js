import koa from "koa";
import http from "http";
import Io from "socket.io";
import Menehra, { $ } from "menhera";

const port = process.env.PORT || 2333;

const app = new koa();
const server = http.createServer(app.callback());
const io = Io(server);

const IOServer = {
  name: "IOServer",
  _hooks: {
    IOServer: {
      on: {
        _({ _key, _val }) {
          let { connection } = _val;
          io.on("connection", socket => {
            let events = connection(socket);
            $(events, (key, _val) => {
              socket.on(key, _val);
            });
          });
        }
      }
    }
  }
};

const _ = new Menehra({
  _mount: {
    IOServer
  },
  IOServer: {
    on: {
      connection: socket => ({
        "mhr-devtools-init"() {
          socket.broadcast.emit("mhr-devtools-init");
        },
        "mhr-message"(data) {
          socket.broadcast.emit("mhr-message", data);
        }
      })
    }
  }
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
