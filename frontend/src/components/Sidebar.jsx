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
  const { userData, setUserData ,token,setToken} = useContext(AppContext);
  const navigate = useNavigate();

  const navLinks = [
    { path: "/dashboard", icon: FaChartLine, label: "Dashboard" },
    { path: "/employees", icon: FaUser, label: "Employees" },
    { path: "/tasks", icon: FaTasks, label: "Tasks" },
    { path: "/settings", icon: FaCog, label: "Settings" },
    //  Logout button placed separately below
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
    <>
      <aside
        className={`fixed top-0 left-0 w-64 bg-blue-50 shadow-md z-40 p-6
        flex flex-col justify-start md:justify-between
        transform transition-transform duration-300
        h-full min-h-[100vh] md:min-h-[120vh] 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex`}
      >
        {/*  Close Button - Mobile */}
        <div className="md:hidden flex justify-end mb-2">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/*  Content */}
        <div className="mt-0 flex flex-col gap-8 flex-grow overflow-y-auto">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={yourLogo}
              alt="EmployEase Logo"
              className="w-40 h-auto object-contain hover:scale-105 transition-transform"
            />
          </div>

          {/* Navigation */}
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
                        ? "text-blue-700 bg-blue-100 border-l-4 border-blue-500"
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
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-sm md:text-base text-red-600 hover:bg-red-100 font-medium transition-all"
              >
                <span>Logout</span>
                <FaSignOutAlt className="text-lg" />
              </button>
            </li>
            {/* Footer  */}
            {userData && (
              <li className="mt-6 pt-4 border-t text-sm text-gray-600 flex items-center gap-3 px-4">
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
    </>
  );
};

export default Sidebar;
