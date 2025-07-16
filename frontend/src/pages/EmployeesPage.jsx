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
    systemSettings,
  } = useContext(AppContext);

  const isDark = systemSettings?.theme === "dark";

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

  const bgClass = isDark ? "bg-gray-900" : "bg-white";
  const textClass = isDark ? "text-white" : "text-black";
  const cardClass = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const inputClass = isDark
    ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
    : "bg-white text-black border-gray-300";

  return (
    <div className={`flex min-h-screen ${bgClass} ${textClass}`}>
      <Sidebar />

      <main className="flex-1 px-6 py-6">
        {!showForm && (
          <>
            {/* Mobile Navbar */}
            <div className={`md:hidden mb-4 flex items-center justify-between border-b pb-2 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={openSidebar}
                  className={`p-2 rounded-md shadow-md ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
                >
                  <FaBars />
                </button>
                <h1 className="text-lg font-bold">Employees</h1>
              </div>
              <div className="flex items-center gap-4">
                <FaSearch className="text-lg cursor-pointer hover:text-blue-500" />
                <FaBell className="text-lg cursor-pointer hover:text-blue-500" />
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Employees</h1>
                <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm mt-1`}>
                  Manage your team members and their information
                </p>
              </div>
              <button
                onClick={openAddForm}
                className="border border-purple-500 text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition text-sm"
              >
                + Add Employee
              </button>
            </div>

            {/* Filters/Search */}
            <div className={`border rounded-xl p-4 sm:p-6 mb-6 ${cardClass}`}>
              <h2 className="text-base sm:text-lg font-semibold mb-4">Employee List</h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputClass}`}
                  />
                  <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                </div>
                <div className="flex gap-3">
                  <select
                    className={`border text-sm rounded-md px-3 py-2 ${inputClass}`}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="All">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>

                  <select
                    className={`border text-sm rounded-md px-3 py-2 ${inputClass}`}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Employee Table */}
            <div className={`hidden md:block border rounded-2xl overflow-hidden ${cardClass}`}>
              <table className="w-full text-sm text-left">
                <thead className={`${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"} font-medium`}>
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr key={emp._id} className={isDark ? "border-t border-gray-700" : "border-t"}>
                        <td className="px-6 py-3">{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.role}</td>
                        <td>{emp.department}</td>
                        <td>{emp.status}</td>
                        <td className="flex gap-2 px-6 py-3">
                          <button className="text-blue-400" onClick={() => openEditForm(emp)}>
                            <FaEdit />
                          </button>
                          <button className="text-red-400" onClick={() => deleteEmployee(emp._id)}>
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-400">No employees found.</td>
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
                  className={`border rounded-xl p-4 shadow-sm flex flex-col gap-2 relative ${cardClass}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base">{emp.name}</h3>
                      <p className="text-sm text-gray-400">{emp.email}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(emp._id)}
                        className="text-gray-500 hover:text-gray-300 text-xl font-bold"
                      >
                        ⋮
                      </button>
                      {showDropdown === emp._id && (
                        <div className={`absolute right-0 mt-2 w-28 border rounded-md shadow-lg z-10 ${isDark ? "bg-gray-900 border-gray-700" : "bg-white"}`}>
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
                    <span className="text-xs px-2 py-1 rounded-full font-semibold bg-blue-600 text-white">
                      {emp.role}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      emp.status === "Active" ? "bg-green-600 text-white" : "bg-gray-400 text-white"
                    }`}>
                      {emp.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400">Department: {emp.department}</p>
                </div>
              ))}

              {/* Mobile +Add Button */}
              <button
                onClick={openAddForm}
                className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg shadow hover:bg-purple-700 transition text-sm mt-4"
              >
                + Add Employee
              </button>
            </div>
          </>
        )}

        {/* Form Component */}
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
