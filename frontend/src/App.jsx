import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Menu from "./components/Menu";
import Tickets from "./components/Tickets";
import Customers from "./components/Customers";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import AddTicket from "./components/AddTicket";
import Home from "./components/Home";
import Pagenotfound from "./components/Pagenotfound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

        <div className="flex">
          <Menu />
          <div className="md:ml-64 ml-36 flex-grow md:p-4 p-2">
            <Routes>
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/user/add-ticket" element={<AddTicket />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Pagenotfound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
