// src/components/HeroSection.jsx
import React from "react";
import employee from "../assets/employee.png";
import { FaUsers, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-200  py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">

        {/*  Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 leading-tight flex items-center justify-center md:justify-start gap-2">
            <FaUsers className="text-blue-600" />
            Empower Your Team
          </h2>
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 leading-tight mt-1">
            Simplify Workforce Management
          </h2>

          <p className="mt-4 text-gray-700 text-lg">
            Take control of employee management with <b>EmployEase</b> — your all-in-one platform to organize employee data, assign tasks, and monitor performance in real-time.
          </p>

          {/*  Call to Action */}
          <Link to="/login">
            <button
              className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out flex items-center gap-2 mx-auto md:mx-0"
            >
              <FaRocket />
              Get Started Free
            </button>
          </Link>
        </div>

        {/*  Right Side Image */}
        <div className="md:w-1/2">
          <img
            src={employee}
            alt="Team management illustration"
            className="w-full rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
