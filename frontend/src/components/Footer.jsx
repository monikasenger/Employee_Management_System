import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope, FaBuilding, FaBoxOpen, FaLifeRing } from "react-icons/fa";

import icon from "../assets/logo.png"; // logo with text & icon

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 px-6">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

      {/*  Left - Logo & Description */}
      <div className="flex flex-col items-start gap-5">
        <img
          src={icon}
          alt="EmployEase Logo"
          className="h-auto w-48 md:w-56 object-cover"
        />

        <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
          Empowering teams with intuitive employee and task management tools — everything you need in one place.
        </p>

        {/*  Social Icons */}
        <div className="flex gap-4 mt-1">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white text-xl transition">
            <FaLinkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white text-xl transition">
            <FaGithub />
          </a>
          <a href="mailto:contact@employease.com" className="text-blue-400 hover:text-white text-xl transition">
            <FaEnvelope />
          </a>
        </div>
      </div>

    {/*  Right - Useful Links */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">

  {/* Company */}
  <div>
    <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
      <FaBuilding className="text-white" /> Company
    </h4>
    <ul className="space-y-1">
      <li><Link to="/" className="hover:text-white transition">Home</Link></li>
      <li><a href="#features" className="hover:text-white transition">Features</a></li>
      <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
    </ul>
  </div>

  {/* Product */}
  <div>
    <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
      <FaBoxOpen className="text-white" /> Product
    </h4>
    <ul className="space-y-1">
      <li><a href="#" className="hover:text-white transition">Overview</a></li>
      <li><a href="#" className="hover:text-white transition">Pricing</a></li>
      <li><a href="#" className="hover:text-white transition">Integrations</a></li>
    </ul>
  </div>

  {/* Support */}
  <div>
    <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
      <FaLifeRing className="text-white" /> Support
    </h4>
    <ul className="space-y-1">
      <li><a href="#" className="hover:text-white transition">Help Center</a></li>
      <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
      <li><a href="#" className="hover:text-white transition">Terms</a></li>
    </ul>
  </div>

</div>
</div>

    {/*  Bottom Line */}
    <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
      © 2025 <span className="text-blue-400 font-semibold">EmployEase</span>. Built with 💙 by Monika.
    </div>
  </footer>
);

export default Footer;
