import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError("");

    try {
      await axios.post(
        "https://help-desk-here.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );
      toast.success("Registration successful!"); // Success toast
      navigate("/login");
    } catch (err) {
      setLoading(false); // Stop loading
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again."); // Error toast
    } finally {
      setLoading(false); // Ensure loading is stopped on completion
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
          Register
        </h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-600 bg-gray-700 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-600 bg-gray-700 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-600 bg-gray-700 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-400">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-600 bg-gray-700 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`bg-blue-500 text-white w-full py-3 rounded transition duration-200 ${
              loading ? "cursor-not-allowed bg-blue-400" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
