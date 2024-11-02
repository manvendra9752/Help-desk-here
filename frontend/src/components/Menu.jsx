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
import { useEffect } from "react";

const Menu = () => {
  const role = useSelector((state) => state.user.role);

  return (
    <div className="fixed bg-gray-900 text-white w-28 md:w-64 h-screen md:p-6 p-1">
      <img className="p-4 mb-10" src={image} alt="Helpdesk Logo" />

      <ul className="space-y-4">
        {/* Menu options based on role */}
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
                <FontAwesomeIcon icon={faTicketAlt} className="mr-3" />
                <span>My Tickets</span>
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
                <FontAwesomeIcon icon={faPlusCircle} className="mr-3" />
                <span>Add Ticket</span>
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
              <FontAwesomeIcon icon={faTicketAlt} className="mr-3" />
              <span>View All Tickets</span>
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
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                <span>Manage Customers</span>
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
                <FontAwesomeIcon icon={faTicketAlt} className="mr-3" />
                <span>View All Tickets</span>
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
                <FontAwesomeIcon icon={faThLarge} className="mr-3" />
                <span>Dashboard</span>
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
                <span>Login</span>
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
                <span>Register</span>
              </NavLink>
            </li>
            <p className="text-red-300 text-sm">
              🙏 Apologies for the delay in loading on Render/Vercel. If login
              or register doesn’t respond right away, please refresh and try
              again it will run properly at second time.
            </p>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
