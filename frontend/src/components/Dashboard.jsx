import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const config = {
          headers: { Authorization: token },
        };
        const userRes = await axios.get(
          "http://localhost:5000/api/users/count",
          config
        );
        const ticketRes = await axios.get(
          "http://localhost:5000/api/count/tickets",
          config
        );

        setTicketCount(ticketRes.data.count);
        setUserCount(userRes.data.count);
      } catch (error) {
        toast.error("Error fetching counts. Please try again later.");
        console.error("Error fetching counts", error);
      }
    };
    fetchCounts();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-900">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="text-center space-y-10">
        <h1 className="md:text-5xl text-3xl font-bold text-white tracking-wider mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 max-w-3xl">
          {/* Ticket Count */}
          <div className="p-8 rounded-2xl bg-indigo-700 shadow-2xl shadow-indigo-900 transform transition duration-500 hover:scale-105 hover:bg-indigo-800">
            <p className="text-lg font-medium text-indigo-100">Total Tickets</p>
            <p className="text-6xl font-extrabold text-white mt-4">
              {ticketCount}
            </p>
          </div>

          {/* User Count */}
          <div className="p-8 rounded-2xl bg-purple-700 shadow-2xl shadow-purple-900 transform transition duration-500 hover:scale-105 hover:bg-purple-800">
            <p className="text-lg font-medium text-purple-100">Total Users</p>
            <p className="text-6xl font-extrabold text-white mt-4">
              {userCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
