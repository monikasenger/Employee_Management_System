import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AddEditEmployeeForm = ({ mode, employeeData, showForm, setShowForm }) => {
  const isEdit = mode === "edit";
  const { backend, fetchEmployees } = useContext(AppContext);

  const openSidebar = () => {
    document.dispatchEvent(new Event("openSidebar"));
  };

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "Active",
  });

  useEffect(() => {
    if (isEdit && employeeData) {
      setEmployee(employeeData);
    } else {
      setEmployee({
        name: "",
        email: "",
        role: "",
        department: "",
        status: "Active",
      });
    }
  }, [mode, employeeData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const toggleStatus = () => {
    setEmployee((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Inactive" : "Active",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${backend}/api/employees/${employee._id}`, employee);
        alert("Employee updated successfully!");
      } else {
        await axios.post(`${backend}/api/employees`, employee);
        alert("Employee added successfully!");
      }
      fetchEmployees();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee.");
    }
  };

  const roleOptions = ["Developer", "Manager", "Designer", "QA", "HR"];
  const departmentOptions = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
  ];

  if (!showForm) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Navbar */}
      <div className="md:hidden border-b-4 border-blue-500 pb-2 mb-2">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={openSidebar}
              className="text-gray-700 bg-white p-2 rounded-md shadow-md"
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Employees</h1>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <FaSearch className="text-lg cursor-pointer hover:text-blue-600" />
            <FaBell className="text-lg cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="hidden md:block px-8 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Employee" : "Add Employee"}
        </h2>
        <p className="text-gray-600 text-lg">
          Please {isEdit ? "update" : "fill in"} the details below to {isEdit ? "edit" : "add"} an employee.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border p-8 rounded-xl shadow bg-gray-50">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="text-purple-600 hover:text-purple-800"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h3 className="text-xl font-semibold text-gray-800">
              Employee Information
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className="block mb-2 font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={employee.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" disabled>
                  Select department
                </option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-3">
              <label className="font-medium text-gray-700">Status:</label>
              <button
                type="button"
                onClick={toggleStatus}
                className={`relative inline-flex items-center h-6 rounded-full w-12 focus:outline-none ${
                  employee.status === "Active"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
                aria-pressed={employee.status === "Active"}
              >
                <span
                  className={`transform transition ease-in-out duration-200 inline-block w-5 h-5 bg-white rounded-full ${
                    employee.status === "Active"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">{employee.status}</span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditEmployeeForm;
