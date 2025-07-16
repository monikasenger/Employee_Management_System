import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaComments,
  FaCogs,
  FaEnvelope,
  FaSignInAlt,
} from "react-icons/fa";
import icon from "../assets/icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={icon}
            alt="EmployEase Logo"
            className="h-12 w-12 rounded-full border border-blue-300 p-1 shadow"
          />
          <Link
            to="/"
            className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition"
          >
            EmployEase
          </Link>
        </div>

        {/*  Desktop Nav Links + Login (right aligned) */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
           <Link
    to="/testimonies"
    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 uppercase transition"
  >
    <FaComments /> Testimonies
  </Link>
          <a
            href="#features"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 uppercase transition"
          >
            <FaCogs /> Features
          </a>
          <a
            href="#contact"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 uppercase transition"
          >
            <FaEnvelope /> Contact
          </a>

          <Link to="/login">
            <button className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out flex items-center gap-2">
              <FaSignInAlt />
              Login
            </button>
          </Link>
        </div>

        {/*  Mobile Only: Login + Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/login" className="flex items-center gap-1 text-blue-600 font-semibold text-sm border border-blue-500 px-3 py-1 rounded-full shadow hover:bg-blue-50 transition">
            <FaSignInAlt className="text-base" />
            <span>Login</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-blue-700 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/*  Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-md">
          <a
            href="#testimonies"
            className="block py-2 text-gray-700 font-semibold flex items-center gap-2"
          >
            <FaComments /> Testimonies
          </a>
          <a
            href="#features"
            className="block py-2 text-gray-700 font-semibold flex items-center gap-2"
          >
            <FaCogs /> Features
          </a>
          <a
            href="#contact"
            className="block py-2 text-gray-700 font-semibold flex items-center gap-2"
          >
            <FaEnvelope /> Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
