const express = require("express");
const { createServer } = require("http");
const socket = require("socket.io");
const path = require("path");
const cors = require("cors");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.httpServer = createServer(this.app);
    this.io = new socket.Server(this.httpServer, {
      /* options */
    });
    this.sockets = new Sockets(this.io);
  }
  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
    this.app.get("/latest", (req, res) => {
      res.status(200).json({
        ok: true,
        lastest: this.sockets.ticketList.last12,
      });
    });
  }

  execute() {
    // Initialize middlewares
    this.middlewares();

    // Start the server
    this.httpServer.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
