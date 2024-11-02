const Ticket = require("../models/Ticket");
// const Note = require("../models/Note");

exports.createTicket = async (req, res) => {
  const { title } = req.body;
  try {
    const ticket = new Ticket({
      title,
      customer: req.user.id,
      status: "Pending",
    });
    await ticket.save();
    res.status(201).json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("customer", "name email");
    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "customer",
      "name email"
    );
    if (!ticket)
      return res.status(404).json({ success: false, msg: "Ticket not found" });
    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

exports.updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket)
      return res.status(404).json({ success: false, msg: "Ticket not found" });

    ticket.status = status;
    await ticket.save();
    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

exports.getTicketByUserId = async (req, res) => {
  try {
    const tickets = await Ticket.find({ customer: req.params.userid });
    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
