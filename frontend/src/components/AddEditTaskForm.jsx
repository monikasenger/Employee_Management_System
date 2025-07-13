import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AddEditTaskForm = ({ mode, taskData, showForm, setShowForm }) => {
  const isEdit = mode === "edit";
  const openSidebar = () => {
    document.dispatchEvent(new Event("openSidebar"));
  };

  const { backend, fetchTasks } = useContext(AppContext);

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

  return (
    <div className="min-h-screen bg-white">
      {/*  Mobile Navbar */}
      <div className="md:hidden border-b-4 border-blue-500 pb-2 mb-2">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={openSidebar}
              className="text-gray-700 bg-white p-2 rounded-md shadow-md"
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Tasks</h1>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <FaSearch className="text-lg cursor-pointer hover:text-blue-600" />
            <FaBell className="text-lg cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/*  Desktop Title */}
      <div className="hidden md:block px-8 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Task" : "Add Task"}
        </h2>
        <p className="text-gray-600 text-lg">
          Please {isEdit ? "update" : "fill in"} the details below to {isEdit ? "edit" : "add"} a task.
        </p>
      </div>

      {/*  Form Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border p-8 rounded-xl shadow bg-gray-50">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="text-purple-600 hover:text-purple-800"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h3 className="text-xl font-semibold text-gray-800">Task Information</h3>
          </div>

          {/*  Form Starts */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-700">Task Name</label>
                <input
                  name="task"
                  value={task.task}
                  onChange={handleChange}
                  placeholder="e.g. Update Database"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className="block mb-2 font-medium text-gray-700">Employee Name</label>
                <input
                  name="employeeName"
                  value={task.employeeName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className="block mb-2 font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <label className="block mb-2 font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <label className="block mb-2 font-medium text-gray-700">Department</label>
                <select
                  name="department"
                  value={task.department}
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
