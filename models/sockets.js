class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("New client connected");
    });
  }
}
module.exports = Sockets;
