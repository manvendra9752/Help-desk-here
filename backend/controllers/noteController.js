const Note = require("../models/Note");
const Ticket = require("../models/Ticket");

exports.addNote = async (req, res) => {
  const { text } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket)
      return res.status(404).json({
        success: false,
        msg: "Ticket not found",
      });

    const note = new Note({
      ticket: req.params.ticketId,
      author: req.user.id,
      text,
    });
    await note.save();

    ticket.lastUpdated = Date.now();
    await ticket.save();

    res.status(201).json({
      success: true,
      note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

exports.getNotesByTicket = async (req, res) => {
  try {
    const notes = await Note.find({ ticket: req.params.ticketId }).populate(
      "author",
      "name"
    );
    res.json({
      success: true,
      notes: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};
