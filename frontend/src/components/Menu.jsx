import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt,
  faPlusCircle,
  faUser,
  faThLarge,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import image from "../assets/imagemenu.png";

const Menu = () => {
  const role = useSelector((state) => state.user.role);

  return (
    <div className="fixed bg-gray-900 text-white w-28 md:w-64 h-screen md:p-6 p-1">
      <img className="md:p-4 p-2 mb-10" src={image} alt="Helpdesk Logo" />

      <ul className="space-y-4">
        {role === "customer" && (
          <>
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faTicketAlt} className="mr-1 md:mr-3" />
                <span className="md:text-xl text-xs">My Tickets</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/add-ticket"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faPlusCircle} className="mr-1 md:mr-3" />
                <span className="md:text-xl text-xs">Add Ticket</span>
              </NavLink>
            </li>
          </>
        )}
        {role === "agent" && (
          <li>
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              <FontAwesomeIcon icon={faTicketAlt} className="mr-1 md:mr-3" />
              <span className="md:text-xl text-xs">View All Tickets</span>
            </NavLink>
          </li>
        )}
        {role === "admin" && (
          <>
            <li>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faUser} className="mr-1 md:mr-3" />
                <span className="md:text-xl text-xs">Manage Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faTicketAlt} className="mr-1 md:mr-3" />
                <span className="md:text-xl text-xs">View All Tickets</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faThLarge} className="mr-1 md:mr-3" />
                <span className="md:text-xl text-xs">Dashboard</span>
              </NavLink>
            </li>
          </>
        )}
        {!role && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-3" />
                <span className="md:text-xl text-xs">Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                <span className="md:text-xl text-xs">Register</span>
              </NavLink>
            </li>
            <p className="text-xs p-3 text-red-300">
              ⏳ The first loading may take between 50 seconds to 1 minute due
              to RENDER deploy. Thank you for your patience! 😊
            </p>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
