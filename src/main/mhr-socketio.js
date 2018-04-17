import socket from "socket.io-client";
import Io from "socket.io";
import { $ } from "menhera";

export const IOClient = () => ({
  name: "IOClient",
  socket: null,
  _hooks: {
    IOClient: {
      config: {
        url({ _val }) {
          this.socket = socket(_val);
        }
      },
      on({ _key, _val }) {
        const events = _val(this.socket);
        $(events, (key, val) => {
          this.socket.on(key, data => val(data));
        });
      },
      emit: {
        $({ _key, _val }) {
          this.socket.emit(_key, _val);
        }
      }
    }
  }
});

export const IOServer = () => ({
  name: "IOServer",
  io: null,
  _hooks: {
    IOServer: {
      config: {
        server: {
          _({ _val }) {
            this.io = Io(_val);
          }
        }
      },
      on: {
        $({ _key, _val }) {
          this.io.on(_key, socket => {
            let events = _val(socket);
            $(events, (key, _val) => {
              socket.on(key, _val);
            });
          });
        }
      }
    }
  }
});
