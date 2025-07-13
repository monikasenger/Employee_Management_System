// src/pages/FeaturesPage.jsx
import React from "react";
import { features } from "../assets/assets";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-blue-800 mb-4">Our Features</h2>
        <p className="text-gray-600 mb-12 text-sm md:text-base">
          Discover the powerful tools that make <span className="font-semibold text-purple-600">EmployEase</span> your go-to solution for smart workforce management.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, iconClass, title, description }, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-blue-100"
            >
              <div className="mb-4 flex justify-center">
                <Icon className={iconClass} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
