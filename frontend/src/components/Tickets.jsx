import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTickets } from "../redux/ticketSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStickyNote,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tickets = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket.tickets);
  const role = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.user.token);
  const userid = useSelector((state) => state.user.userid);
  const [notes, setNotes] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [modalType, setModalType] = useState("");
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const fetchTickets = async () => {
    const config = { headers: { Authorization: token } };
    setLoading(true);
    try {
      const res =
        role === "customer"
          ? await axios.get(
              `https://help-desk-here.onrender.com/api/tickets/user/${userid}`,
              config
            )
          : await axios.get(
              "https://help-desk-here.onrender.com/api/tickets",
              config
            );
      if (res.data.success) {
        dispatch(setTickets(res.data.tickets));
      }
    } catch (error) {
      toast.error("Error fetching tickets.");
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [dispatch, role, token, userid]);

  const fetchTicketDetails = async (ticketId) => {
    const config = { headers: { Authorization: token } };
    setLoadingDetails(true);
    try {
      const res = await axios.get(
        `https://help-desk-here.onrender.com/api/tickets/notes/${ticketId}`,
        config
      );
      if (res.data.success) {
        setTicketData(res.data);
      }
    } catch (error) {
      toast.error("Error fetching ticket details.");
      console.error("Error fetching ticket details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleTicketClick = (ticketId) => {
    if (expandedTicketId === ticketId) {
      setExpandedTicketId(null);
      setModalType("");
    } else {
      fetchTicketDetails(ticketId);
      setModalType("show");
      setExpandedTicketId(ticketId);
    }
  };

  const handleAddNoteClick = (ticketId) => {
    setModalType("add");
    setExpandedTicketId(ticketId);
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!notes.trim()) return;
    setAddingNote(true);
    const newNote = { text: notes, userId: userid, role };
    const config = { headers: { Authorization: token } };
    try {
      const res = await axios.post(
        `https://help-desk-here.onrender.com/api/tickets/${expandedTicketId}/notes`,
        newNote,
        config
      );
      if (res.data.success) {
        setNotes("");
        fetchTicketDetails(expandedTicketId);
        setModalType("show");
        toast.success("Note added successfully.");
      }
    } catch (error) {
      toast.error("Error adding note.");
      console.error("Error adding note:", error);
    } finally {
      setAddingNote(false);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    const config = { headers: { Authorization: token } };
    try {
      const res = await axios.patch(
        `https://help-desk-here.onrender.com/api/tickets/${ticketId}`,
        { status: newStatus },
        config
      );
      if (res.data.success) {
        fetchTickets();
        if (expandedTicketId === ticketId) fetchTicketDetails(ticketId);
        toast.success(`Status updated to ${newStatus}.`);
      }
    } catch (error) {
      toast.error("Error updating ticket status.");
      console.error("Error updating ticket status:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900 text-gray-200 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Support Tickets
      </h1>
      {loading ? (
        <p className="text-center text-gray-400">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-center text-gray-400">
          No tickets available. Please check back later or create a new ticket.
        </p>
      ) : (
        <ul className="border rounded-lg divide-y divide-gray-700">
          {tickets.map((ticket) => (
            <li
              key={ticket._id}
              className="p-4 transition-colors duration-200 flex flex-col"
            >
              <div className="flex justify-between items-center cursor-pointer p-2 rounded-lg">
                <div>
                  <h2 className="font-semibold text-lg my-1 text-gray-100">
                    {ticket.title}
                  </h2>
                  <p className="text-sm text-gray-400 my-1">
                    Created on:{" "}
                    <span className="text-gray-300">
                      {formatDate(ticket.lastUpdated)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:
                    <span
                      className={`inline-block ml-2 px-2 py-1 rounded text-white text-xs ${
                        ticket.status === "Active"
                          ? "bg-blue-400"
                          : ticket.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </p>
                  {(role === "admin" || role === "agent") && (
                    <select
                      value={ticket.status}
                      onChange={(e) =>
                        handleStatusChange(ticket._id, e.target.value)
                      }
                      className="mt-3 p-2 px-3 border rounded-lg text-pink-200 bg-gray-800 hover:bg-gray-700"
                    >
                      <option value="Active" className="text-green-400">
                        Active
                      </option>
                      <option value="Pending" className="text-blue-400">
                        Pending
                      </option>
                      <option value="Closed" className="text-red-500">
                        Closed
                      </option>
                    </select>
                  )}
                </div>
                <div>
                  <div
                    className="flex items-center "
                    onClick={() => handleTicketClick(ticket._id)}
                  >
                    <FontAwesomeIcon
                      icon={faStickyNote}
                      className="text-gray-500 text-2xl hover:text-gray-300 transition-colors duration-200"
                      title="View Notes"
                    />
                    <span className="text-yellow-500 rounded-sm hidden md:block ml-2">
                      {" "}
                      View Notes
                    </span>
                  </div>
                  <div
                    className="flex items-center  mt-4"
                    onClick={() => handleAddNoteClick(ticket._id)}
                  >
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="text-blue-500 hover:text-blue-500 text-2xl transition-colors duration-200"
                      title="Add Note"
                    />
                    <span className="text-orange-500 rounded-sm hidden md:block ml-2">
                      Add Note
                    </span>
                  </div>
                </div>
              </div>

              {expandedTicketId === ticket._id && modalType === "show" && (
                <div className="relative mt-4 p-4 rounded-lg">
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => setExpandedTicketId(null)}
                    className="absolute top-2 right-2 text-red-400 cursor-pointer text-2xl mr-4 hover:text-red-600 hover:scale-150 transition-colors duration-200"
                    title="Close"
                  />
                  <h3 className="text-lg font-semibold mb-3 text-gray-200">
                    Notes
                  </h3>
                  {loadingDetails ? (
                    <p className="text-center text-gray-400">
                      Loading notes...
                    </p>
                  ) : ticketData?.notes?.length === 0 ? (
                    <p className="text-gray-400">
                      No notes available. Add a note!
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {ticketData?.notes?.map((note, index) => (
                        <li
                          key={index}
                          className={`p-3 border rounded-lg ${
                            note.role === "admin"
                              ? "bg-red-800"
                              : note.role === "agent"
                              ? "bg-yellow-800"
                              : "bg-black"
                          }`}
                        >
                          <p className="text-yellow-500">{note.text}</p>
                          <p>
                            Edited By:{" "}
                            <span className="text-blue-400">
                              {note.author.name}
                            </span>{" "}
                          </p>
                          <small className="text-gray-300">
                            {note.role} on {formatDate(note.createdAt)}
                          </small>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {expandedTicketId === ticket._id && modalType === "add" && (
                <div className="relative mt-4 p-4 rounded-lg">
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => setExpandedTicketId(null)}
                    className="absolute top-1 right-2 text-red-400 cursor-pointer text-2xl mr-4 hover:text-red-600 hover:scale-150 transition-colors duration-200"
                    title="Close"
                  />
                  <form onSubmit={handleNoteSubmit} className="mt-4">
                    <textarea
                      rows="4"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add a note..."
                      className="border rounded-lg p-2 w-full bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className={`bg-blue-600 text-white p-2 mt-3 rounded-lg w-full hover:bg-blue-500 transition-colors duration-200 ${
                        addingNote ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={addingNote}
                    >
                      {addingNote ? "Adding Note..." : "Add Note"}
                    </button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tickets;
