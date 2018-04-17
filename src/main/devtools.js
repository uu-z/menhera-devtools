import Menehra, { $ } from "menhera";
import { IOClient } from "./mhr-socketio";

const { host = "http://localhost", port = 2333 } = {};

let url = `${host}:${port}`;

const _ = new Menehra({
  _mount: { IOClient },
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
      "mhr-message": data => {
        console.log(data);
      }
    }),
    emit: {}
  }
});
