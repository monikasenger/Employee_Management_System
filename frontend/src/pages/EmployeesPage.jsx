import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaBars, FaSearch, FaBell, FaEdit, FaTrashAlt } from "react-icons/fa";
import AddEditEmployeeForm from "../components/AddEditEmployeeForm";
import { AppContext } from "../context/AppContext";

const EmployeesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showDropdown, setShowDropdown] = useState(null);

  const {
    backend,
    employees,
    fetchEmployees,
    roles,
    statuses,
  } = useContext(AppContext);

  const openSidebar = () => {
    document.dispatchEvent(new Event("openSidebar"));
  };

  const openAddForm = () => {
    setFormMode("add");
    setEmployeeToEdit(null);
    setShowForm(true);
  };

  const openEditForm = (employee) => {
    setFormMode("edit");
    setEmployeeToEdit(employee);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEmployeeToEdit(null);
  };

  const saveEmployee = async (employee) => {
    try {
      if (formMode === "add") {
        await axios.post(`${backend}/api/employees`, employee);
      } else {
        await axios.put(`${backend}/api/employees/${employee._id}`, employee);
      }
      fetchEmployees();
      cancelForm();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`${backend}/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = employees.filter((emp) => {
    const matchName = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = selectedRole === "All" || emp.role === selectedRole;
    const matchStatus = selectedStatus === "All" || emp.status === selectedStatus;
    return matchName && matchRole && matchStatus;
  });

  const toggleDropdown = (id) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 px-6 py-6">
        {!showForm && (
          <>
            {/* Mobile Navbar */}
            <div className="md:hidden mb-4 flex items-center justify-between border-b-2 border-black pb-2">
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

            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your team members and their information
                </p>
              </div>
              <button
                onClick={openAddForm}
                className="bg-white border border-purple-500 text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition text-sm"
              >
                + Add Employee
              </button>
            </div>

            {/* Filters/Search */}
            <div className="bg-white border rounded-xl p-4 sm:p-6 mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                Employee List
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded-md py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                </div>
                <div className="flex gap-3">
                  <select
                    className="border text-sm rounded-md px-3 py-2"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="All">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border text-sm rounded-md px-3 py-2"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Employee Table */}
            <div className="hidden md:block bg-white border rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 font-medium">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr key={emp._id}>
                        <td className="px-6 py-3">{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.role}</td>
                        <td>{emp.department}</td>
                        <td>{emp.status}</td>
                        <td className="flex gap-2 px-6 py-3">
                          <button
                            className="text-blue-600"
                            onClick={() => openEditForm(emp)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-600"
                            onClick={() => deleteEmployee(emp._id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 py-4">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp._id}
                  className="border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2 relative"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base text-gray-900">
                        {emp.name}
                      </h3>
                      <p className="text-sm text-gray-600">{emp.email}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(emp._id)}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                      >
                        ⋮
                      </button>

                      {showDropdown === emp._id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-10">
                          <button
                            onClick={() => {
                              toggleDropdown(null);
                              openEditForm(emp);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => {
                              toggleDropdown(null);
                              deleteEmployee(emp._id);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        emp.role === "Admin"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {emp.role}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        emp.status === "Active"
                          ? "bg-black text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    Department: {emp.department}
                  </p>
                </div>
              ))}

              {/*  Mobile +Add Employee Button */}
              <button
                onClick={openAddForm}
                className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg shadow hover:bg-purple-700 transition text-sm mt-4"
              >
                + Add Employee
              </button>
            </div>
          </>
        )}

        {/* Form */}
        <AddEditEmployeeForm
         mode={formMode}
          employeeData={employeeToEdit}
          onCancel={cancelForm}
          onSave={saveEmployee}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </main>
    </div>
  );
};

export default EmployeesPage;
