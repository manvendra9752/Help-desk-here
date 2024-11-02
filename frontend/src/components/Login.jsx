import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserRole } from "../redux/userSlice";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://help-desk-here.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      setLoading(false);

      if (res.data.success === true) {
        dispatch(setUserRole(res.data));
        toast.success("Login successful!");
      } else {
        toast.error("Login failed. Please try again.");
      }

      const userRole = res.data.user.role;
      if (userRole === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
          Login
        </h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white w-full py-3 rounded transition duration-200 ${
              loading ? "cursor-not-allowed bg-blue-400" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <p className="text-blue-400 hover:underline">Register here</p>
        </p>
      </div>
    </div>
  );
};

export default Login;
