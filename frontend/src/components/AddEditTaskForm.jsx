import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AddEditTaskForm = ({ mode, taskData, showForm, setShowForm }) => {
  const isEdit = mode === "edit";
  const openSidebar = () => {
    document.dispatchEvent(new Event("openSidebar"));
  };

  const { backend, fetchTasks, systemSettings } = useContext(AppContext);

  const isDark = systemSettings?.theme === "dark";

  const [task, setTask] = useState({
    task: "",
    employeeName: "",
    priority: "Medium",
    status: "In Progress",
    dueDate: "",
    department: "",
    active: true,
  });

  useEffect(() => {
    if (isEdit && taskData) {
      setTask(taskData);
    } else {
      setTask({
        task: "",
        employeeName: "",
        priority: "Medium",
        status: "In Progress",
        dueDate: "",
        department: "",
        active: true,
      });
    }
  }, [mode, taskData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${backend}/api/tasks/${task._id}`, task);
        alert("Task updated successfully!");
      } else {
        await axios.post(`${backend}/api/tasks`, task);
        alert("Task added successfully!");
      }
      fetchTasks();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task.");
    }
  };

  const priorityOptions = ["High", "Medium", "Low"];
  const statusOptions = ["Pending", "In Progress", "Completed"];
  const departmentOptions = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

  if (!showForm) return null;

  const bgClass = isDark ? "bg-gray-900" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-800";
  const inputClass = isDark
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-black";
  const labelClass = isDark ? "text-gray-300" : "text-gray-700";
  const cardBgClass = isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50";

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Mobile Navbar */}
      <div className={`md:hidden border-b-4 pb-2 mb-2 ${isDark ? "border-blue-700" : "border-blue-500"}`}>
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={openSidebar}
              className={`p-2 rounded-md shadow-md ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
            >
              <FaBars />
            </button>
            <h1 className={`text-lg font-bold ${textClass}`}>Tasks</h1>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <FaSearch className="text-lg cursor-pointer hover:text-blue-500" />
            <FaBell className="text-lg cursor-pointer hover:text-blue-500" />
          </div>
        </div>
      </div>

      {/* Desktop Title */}
      <div className="hidden md:block px-8 mb-6">
        <h2 className={`text-3xl font-bold ${textClass}`}>
          {isEdit ? "Edit Task" : "Add Task"}
        </h2>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-lg`}>
          Please {isEdit ? "update" : "fill in"} the details below to {isEdit ? "edit" : "add"} a task.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`border p-8 rounded-xl shadow ${cardBgClass}`}>
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="text-purple-500 hover:text-purple-700"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h3 className={`text-xl font-semibold ${textClass}`}>Task Information</h3>
          </div>

          {/* Form Starts */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label className={`block mb-2 font-medium ${labelClass}`}>Task Name</label>
                <input
                  name="task"
                  value={task.task}
                  onChange={handleChange}
                  placeholder="e.g. Update Database"
                  required
                  className={`w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border ${inputClass}`}
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className={`block mb-2 font-medium ${labelClass}`}>Employee Name</label>
                <input
                  name="employeeName"
                  value={task.employeeName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className={`w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border ${inputClass}`}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label className={`block mb-2 font-medium ${labelClass}`}>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border ${inputClass}`}
                  required
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className={`block mb-2 font-medium ${labelClass}`}>Status</label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border ${inputClass}`}
                  required
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label className={`block mb-2 font-medium ${labelClass}`}>Priority</label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border ${inputClass}`}
                  required
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className={`block mb-2 font-medium ${labelClass}`}>Department</label>
                <select
                  name="department"
                  value={task.department}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border ${inputClass}`}
                  required
                >
                  <option value="" disabled>Select department</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {isEdit ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskForm;
