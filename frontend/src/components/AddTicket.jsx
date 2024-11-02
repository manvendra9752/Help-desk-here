import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTicket } from "../redux/ticketSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const userid = useSelector((state) => state.user.userid);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { Authorization: token } };
    const newTicket = { title, description, customer: userid };

    try {
      const res = await axios.post(
        "https://help-desk-here.onrender.com/api/tickets",
        newTicket,
        config
      );

      if (res.data.success) {
        dispatch(addTicket(res.data.ticket));
        setTitle("");
        setDescription("");
        navigate("/tickets");
        toast.success("Ticket added successfully!");
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error("Error adding ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Add New Ticket
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ticket Title"
          className="w-full p-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white focus:border-blue-400 focus:ring focus:ring-blue-300"
          required
        />
        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ticket Description"
          className="w-full p-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white focus:border-blue-400 focus:ring focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
