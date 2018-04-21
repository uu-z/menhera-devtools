import Menhera from "menhera";
import { IOClient } from "./mhr-socketio";

const { host = "http://localhost", port = 2333 } = {};

let url = `${host}:${port}`;

const Logger = {
  name: "Logger",
  _hooks: {
    Logger: {
      _({ _, _val }) {
        const { log } = _val;
        if (log) {
          _.events.on("$use", _object => {
            console.log("$use:", _object);
          });
        }
      }
    }
  }
};

const _ = new Menhera({
  _mount: { IOClient, Logger, utils },
  IOClient: {
    config: {
      url
    },
    on: socket => ({
      connect: () => {
        console.log("connect");
      },
      disconnect: () => {
        socket.disconnect();
        console.log("disconnect");
      },
      "mhr-devtools-init": () => {
        console.log("mhr-devtools-init");
      },
      "mhr-message": data => {
        console.log(data);
      }
    }),
    emit: {}
  },
  Logger: {
    log: true
  }
});

window._ = _;
export default _;
