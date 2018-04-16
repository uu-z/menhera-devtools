import io from "socket.io-client";
import Menehra from "menhera";

const { host = "http://localhost", port = 2333 } = {};

let fullHost = `${host}:${port}`;

const IOClient = {
  name: "IOClient",
  socket: null,
  _hooks: {
    IOClient: {
      host({ _val }) {
        this.socket = io(_val);
      },
      on: {
        $({ _key, _val }) {
          this.socket.on(_key, () => _val(this));
        }
      },
      emit: {
        $({ _key, _val }) {
          this.socket.emit(_key, _val);
        }
      }
    }
  }
};

const _ = new Menehra({
  _mount: { IOClient },
  IOClient: {
    host: fullHost,
    on: {
      connect() {
        console.log("connect");
      },
      disconnect({ socket }) {
        socket.disconnect();
        console.log("disconnect");
      }
    },
    emit: {
      "mhr-devtools-init": null
    }
  }
});
