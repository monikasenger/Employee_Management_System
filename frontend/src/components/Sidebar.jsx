import {
  FaChartLine,
  FaUser,
  FaTasks,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import yourLogo from "../assets/logo.png";

import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, setUserData, token, setToken, systemSettings } =
    useContext(AppContext);
  const navigate = useNavigate();

  const isDark = systemSettings?.theme === "dark";

  const navLinks = [
    { path: "/dashboard", icon: FaChartLine, label: "Dashboard" },
    { path: "/employees", icon: FaUser, label: "Employees" },
    { path: "/tasks", icon: FaTasks, label: "Tasks" },
    { path: "/settings", icon: FaCog, label: "Settings" },
  ];

  useEffect(() => {
    const handler = () => setIsOpen(true);
    document.addEventListener("openSidebar", handler);
    return () => document.removeEventListener("openSidebar", handler);
  }, []);

  const handleLogout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 w-64 z-40 p-6 shadow-md transform transition-transform duration-300 h-full min-h-[100vh] md:min-h-[120vh]
        flex flex-col justify-start md:justify-between md:translate-x-0 md:relative md:flex ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }
        ${isDark ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-800"}`}
    >
      {/*  Close Button - Mobile Only */}
      <div className="md:hidden flex justify-end mb-2">
        <button
          onClick={() => setIsOpen(false)}
          className={`${
            isDark ? "text-gray-300 hover:text-red-400" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/*  Main Content */}
      <div className="mt-0 flex flex-col gap-8 flex-grow overflow-y-auto">
        {/*  Logo */}
        <div className="flex justify-center">
          <img
            src={yourLogo}
            alt="EmployEase Logo"
            className="w-40 h-auto object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/*  Navigation Links */}
        <ul className="space-y-3">
          {navLinks.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2 rounded-lg text-sm md:text-base transition-all font-medium
                  ${
                    isActive
                      ? isDark
                        ? "bg-gray-700 text-purple-400 border-l-4 border-purple-500"
                        : "text-blue-700 bg-blue-100 border-l-4 border-blue-500"
                      : isDark
                      ? "text-gray-300 hover:text-purple-300 hover:bg-gray-800"
                      : "text-gray-600 hover:text-blue-700 hover:bg-blue-100"
                  }`
                }
              >
                <span>{label}</span>
                <Icon className="text-lg" />
              </NavLink>
            </li>
          ))}

          {/*  Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all
              ${
                isDark
                  ? "text-red-400 hover:bg-red-900"
                  : "text-red-600 hover:bg-red-100"
              }`}
            >
              <span>Logout</span>
              <FaSignOutAlt className="text-lg" />
            </button>
          </li>

          {/*  Footer Profile */}
          {userData && (
            <li
              className={`mt-6 pt-4 border-t flex items-center gap-3 px-4 text-sm ${
                isDark ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"
              }`}
            >
              <img
                src={userData.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-400"
              />
              <div>
                <p className="font-semibold">{userData.fullName}</p>
                <p className="text-xs">{userData.email}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
