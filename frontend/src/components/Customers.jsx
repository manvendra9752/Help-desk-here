import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    role: "customer",
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state) => state.user.token);
  const baseURL = "http://localhost:5000/api/auth";

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${baseURL}/customers`, {
        headers: { Authorization: token },
      });
      if (res.data.success) {
        setCustomers(res.data.customers);
      }
    } catch (error) {
      toast.error("Error fetching customers.");
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSaveCustomer = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `${baseURL}/customers/${selectedCustomer._id}`,
          selectedCustomer,
          { headers: { Authorization: token } }
        );
        toast.success("Customer updated successfully.");
      } else {
        await axios.post(`${baseURL}/customers`, newCustomer, {
          headers: { Authorization: token },
        });
        toast.success("Customer added successfully.");
      }
      setSelectedCustomer(null);
      setNewCustomer({ name: "", email: "", role: "customer" });
      setIsEditing(false);
      await fetchCustomers();
    } catch (error) {
      toast.error("Error saving customer.");
      console.error("Error saving customer:", error);
    }
  };

  const handleEditCustomer = (user) => {
    setSelectedCustomer(user);
    setIsEditing(true);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`${baseURL}/customers/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Customer deleted successfully.");
      await fetchCustomers();
    } catch (error) {
      toast.error("Error deleting customer.");
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900 text-gray-200 shadow-lg rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">
        Customers Management
      </h1>
      <p className="mb-6 text-gray-400 text-center">
        Admin can manage customer profiles here.
      </p>

      <div className="mb-6">
        {isEditing ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">
              Edit Customer
            </h2>
            <input
              type="text"
              value={selectedCustomer?.name || ""}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  name: e.target.value,
                })
              }
              placeholder="Customer Name"
              className="border border-gray-700 bg-gray-800 text-gray-200 rounded p-2 mb-2 w-full focus:ring focus:ring-blue-500"
            />
            <input
              type="email"
              value={selectedCustomer?.email || ""}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  email: e.target.value,
                })
              }
              placeholder="Customer Email"
              className="border border-gray-700 bg-gray-800 text-gray-200 rounded p-2 mb-2 w-full focus:ring focus:ring-blue-500"
            />
            <select
              value={selectedCustomer?.role || "customer"}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  role: e.target.value,
                })
              }
              className="border border-gray-700 bg-gray-800 text-gray-200 rounded p-2 mb-2 w-full focus:ring focus:ring-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="agent">Customer Agent</option>
            </select>
            <button
              onClick={handleSaveCustomer}
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg w-full mt-2 transition-colors duration-200"
            >
              Save Customer
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-100 mb-3">
              Add New Customer
            </h2>
            <input
              type="text"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              placeholder="Customer Name"
              className="border border-gray-700 bg-gray-800 text-gray-200 rounded p-2 mb-2 w-full focus:ring focus:ring-green-500"
            />
            <input
              type="email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              placeholder="Customer Email"
              className="border border-gray-700 bg-gray-800 text-gray-200 rounded p-2 mb-2 w-full focus:ring focus:ring-green-500"
            />
            <select
              value={newCustomer.role}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, role: e.target.value })
              }
              className="border border-gray-700 bg-gray-800 text-gray-200 rounded p-2 mb-2 w-full focus:ring focus:ring-green-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="agent">Customer Agent</option>
            </select>
            <button
              onClick={handleSaveCustomer}
              className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg w-full mt-2 transition-colors duration-200"
            >
              Add Customer
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Customer List
      </h2>
      <ul className="border border-gray-700 rounded-lg divide-y divide-gray-800">
        {customers.map((customer) => (
          <li
            key={customer._id}
            className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-200"
          >
            <div className="mb-2 md:mb-0">
              <h3 className="font-semibold text-gray-100">{customer.name}</h3>
              <p className="text-gray-400">{customer.email}</p>
              <p className="text-gray-500">Role: {customer.role}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditCustomer(customer)}
                className="text-blue-500 hover:text-blue-300 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCustomer(customer._id)}
                className="text-red-500 hover:text-red-300 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
