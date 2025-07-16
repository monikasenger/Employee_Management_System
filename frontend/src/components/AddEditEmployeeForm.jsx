import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AddEditEmployeeForm = ({ mode, employeeData, showForm, setShowForm }) => {
  const isEdit = mode === "edit";
  const { backend, fetchEmployees, systemSettings } = useContext(AppContext);

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
      console.error("Error saving employee:", error?.response?.data || error.message);
      alert("Failed to save employee.");
    }
  };

  const roleOptions = ["Developer", "Manager", "Designer", "QA", "HR"];
  const departmentOptions = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

  if (!showForm) return null;

  const theme = systemSettings?.theme || "light";
  const isDark = theme === "dark";

  const themeClass = isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const inputTheme = isDark
    ? "bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
    : "bg-white border-gray-300 text-gray-900 focus:ring-purple-500";

  return (
    <div className={`min-h-screen ${themeClass}`}>
      {/* Mobile Navbar */}
      <div className={`md:hidden border-b-4 ${isDark ? "border-purple-500" : "border-blue-500"} pb-2 mb-2`}>
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-3">
            <button onClick={openSidebar} className="bg-transparent p-2 rounded-md shadow-md">
              <FaBars className={isDark ? "text-white" : "text-gray-700"} />
            </button>
            <h1 className="text-lg font-bold">Employees</h1>
          </div>
          <div className="flex items-center gap-4">
            <FaSearch className="text-lg cursor-pointer hover:text-blue-400" />
            <FaBell className="text-lg cursor-pointer hover:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="hidden md:block px-8 mb-6">
        <h2 className="text-3xl font-bold">
          {isEdit ? "Edit Employee" : "Add Employee"}
        </h2>
        <p className="text-lg text-gray-500">
          Please {isEdit ? "update" : "fill in"} the details below to {isEdit ? "edit" : "add"} an employee.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`border p-8 rounded-xl shadow ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50"}`}>
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="text-purple-500 hover:text-purple-700"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h3 className="text-xl font-semibold">Employee Information</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label className="block mb-2 font-medium">Name</label>
                <input
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 ${inputTheme}`}
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className="block mb-2 font-medium">Role</label>
                <select
                  name="role"
                  value={employee.role}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 ${inputTheme}`}
                >
                  <option value="" disabled>Select role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 ${inputTheme}`}
              />
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 font-medium">Department</label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 ${inputTheme}`}
              >
                <option value="" disabled>Select department</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-3">
              <label className="font-medium">Status:</label>
              <button
                type="button"
                onClick={toggleStatus}
                className={`relative inline-flex items-center h-6 rounded-full w-12 focus:outline-none ${
                  employee.status === "Active" ? "bg-green-500" : "bg-gray-400"
                }`}
                aria-pressed={employee.status === "Active"}
              >
                <span
                  className={`transform transition ease-in-out duration-200 inline-block w-5 h-5 bg-white rounded-full ${
                    employee.status === "Active" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm">{employee.status}</span>
            </div>

            {/* Submit */}
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
