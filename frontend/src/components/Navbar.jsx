import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const userToken = useSelector((state) => state.user.token);
  const userName = useSelector((state) => state.user.name);

  return (
    <nav className="bg-gray-800 text-white p-2 sticky top-0 ">
      <div className="flex items-center justify-between max-w-8xl mx-auto">
        <div className="text-xl font-bold flex items-center md:mx-4 mx-1">
          <Link
            to="/"
            className="hover:scale-105 hover:opacity-90 transition-all duration-300 font-mono text-yellow-400"
          >
            Helpdesk
          </Link>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-8 md:mx-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:scale-105 transition-all duration-300 md:text-lg text-sm px-4 py-2 rounded-lg ${
                isActive
                  ? "text-orange-400"
                  : "text-white hover:bg-gray-700 hover:opacity-90"
              }`
            }
          >
            Home
          </NavLink>

          {!userToken ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:scale-105 transition-all duration-300 md:text-xl text-sm bg-blue-500 rounded-lg px-6 py-2 ${
                  isActive
                    ? "bg-blue-700"
                    : "text-white hover:bg-blue-600 hover:opacity-90"
                }`
              }
            >
              Login
            </NavLink>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="md:text-lg text-sm text-blue-400"
                />
                <span className="font-semibold text-white">{userName}</span>
              </div>

              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `hover:scale-105 transition-all duration-300 md:text-lg text-sm bg-red-500 rounded-lg px-6 py-2 ${
                    isActive
                      ? "text-blue-400"
                      : "text-white hover:bg-red-600 hover:opacity-90"
                  }`
                }
              >
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
