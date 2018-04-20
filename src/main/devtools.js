import Menhera from "menhera";
import { IOClient } from "./mhr-socketio";

const { host = "http://localhost", port = 2333 } = {};

let url = `${host}:${port}`;

const _ = new Menhera({
  _mount: { IOClient },
  _hooks: {
    test: {
      A$({ _val }) {
        const {
          profile: { mobile }
        } = _val;
        console.log(_val, mobile);
      }
    }
  },
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
window._ = _;
export default _;
