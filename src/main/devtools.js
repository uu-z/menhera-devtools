import Menhera from "menhera";
import { IOClient } from "./mhr-socketio";

const { host = "http://localhost", port = 2333 } = {};

let url = `${host}:${port}`;

const _ = new Menhera({
  _mount: { IOClient },
  _hooks: {},
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
  }
});
_.events.on("$use", _object => {
  console.log("on $use:", _object);
});
window._ = _;
export default _;
