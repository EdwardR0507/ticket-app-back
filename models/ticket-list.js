const Ticket = require("./ticket");
class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pending = [];
    this.assinged = [];
  }

  get NextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get last12() {
    return this.assinged.slice(0, 12);
  }

  createTicket() {
    const ticket = new Ticket(this.NextNumber);
    this.pending.push(ticket);
    return ticket;
  }

  assignTicket(agent, desk) {
    if (this.pending.length === 0) {
      return null;
    }
    const nextTicket = this.pending.shift();
    nextTicket.agent = agent;
    nextTicket.desk = desk;
    this.assinged.unshift(nextTicket);
    return nextTicket;
  }
}
module.exports = TicketList;
