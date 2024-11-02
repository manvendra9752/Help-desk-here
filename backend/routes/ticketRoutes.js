const express = require("express");
const auth = require("../middleware/authMiddleware");
const { addNote, getNotesByTicket } = require("../controllers/noteController");
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  getTicketByUserId,
} = require("../controllers/ticketController");
const router = express.Router();

router.post("/", auth("customer"), createTicket);
// router.get("/", auth("agent"), getTickets);
router.get("/", auth(), getTickets);

router.get("/user/:userid", auth("customer"), getTicketByUserId);
router.get("/:id", auth(), getTicketById);
router.patch("/:id", auth(), updateTicketStatus);

//notes
router.post("/:ticketId/notes", auth(), addNote);
router.get("/notes/:ticketId", auth(), getNotesByTicket);

module.exports = router;
