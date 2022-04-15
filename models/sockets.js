const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }
  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("New client connected");
      socket.on("new-ticket", (_, callback) => {
        const ticket = this.ticketList.createTicket();
        callback(ticket);
      });
      socket.on("next-ticket", ({ agent, desk }, callback) => {
        const ticket = this.ticketList.assignTicket(agent, desk);
        callback(ticket);
        this.io.emit("tickets-assigned", this.ticketList.last12);
      });
    });
  }
}
module.exports = Sockets;
