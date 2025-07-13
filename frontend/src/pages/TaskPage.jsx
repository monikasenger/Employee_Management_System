import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import AddEditTaskForm from "../components/AddEditTaskForm";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaEdit,
  FaTrashAlt,
  FaTasks,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const TasksPage = () => {
  const {
    backend,
    tasks,
    fetchTasks,
    loading,
    taskstatuses,
    priorities,
  } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const openSidebar = () => document.dispatchEvent(new Event("openSidebar"));

  const openAddForm = () => {
    setFormMode("add");
    setTaskToEdit(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setFormMode("edit");
    setTaskToEdit(task);
    setShowForm(true);
  };

  const saveTask = async (task) => {
    try {
      if (formMode === "add") {
        await axios.post(`${backend}/api/tasks`, task);
      } else {
        await axios.put(`${backend}/api/tasks/${task._id}`, task);
      }
      fetchTasks();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${backend}/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const overdue = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "Completed").length;

  const filteredTasks = tasks.filter((task) => {
    const matchTask = task.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === "All" || task.status === selectedStatus;
    const matchPriority = selectedPriority === "All" || task.priority === selectedPriority;
    return matchTask && matchStatus && matchPriority;
  });

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 px-6 py-6">
        {!showForm && (
          <>
            {/* Mobile Navbar */}
            <div className="md:hidden flex items-center justify-between mb-4 border-b-2 border-black pb-2">
              <div className="flex items-center gap-3">
                <button onClick={openSidebar} className="text-gray-700 bg-white p-2 rounded-md shadow-md">
                  <FaBars />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Tasks</h1>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <FaSearch className="text-lg cursor-pointer hover:text-blue-600" />
                <FaBell className="text-lg cursor-pointer hover:text-blue-600" />
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and track all assigned tasks across departments.
                </p>
              </div>
              <button
                onClick={openAddForm}
                className="bg-white border border-purple-500 text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition text-sm"
              >
                + Add Task
              </button>
            </div>

            {/* Dashboard Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <SummaryCard title="Total Tasks" value={totalTasks} icon={<FaTasks />} />
              <SummaryCard title="In Progress" value={inProgress} icon={<FaSpinner className="animate-spin" />} color="yellow" />
              <SummaryCard title="Completed" value={completed} icon={<FaCheckCircle />} color="green" />
              <SummaryCard title="Overdue" value={overdue} icon={<FaExclamationTriangle />} color="red" />
            </div>

            {/* Filters */}
            <div className="bg-white border rounded-xl p-4 sm:p-6 mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">All Tasks</h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded-md py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                </div>
                <div className="flex gap-3">
                  <select
                    className="border text-sm rounded-md px-3 py-2"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    {(taskstatuses || []).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border text-sm rounded-md px-3 py-2"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                  >
                    <option value="All">All Priority</option>
                    {(priorities || []).map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Task Table */}
            <div className="hidden md:block bg-white border rounded-2xl overflow-hidden">
              {loading ? (
                <div className="text-center py-10 text-purple-600 font-medium">Loading tasks...</div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 font-medium">
                    <tr>
                      <th className="px-6 py-3">Task</th>
                      <th>Employee Name</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Department</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <tr key={task._id}>
                          <td className="px-6 py-3">{task.task}</td>
                          <td>{task.employeeName}</td>
                          <td>
                            <span className={` text-white text-xs px-2 py-1 rounded ${
            task.priority === "High"
              ? "bg-red-500 text-white"
              : task.priority === "Medium"
              ? "bg-yellow-400 text-black"
              : "bg-green-200 text-black"
          }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td>
                            <span className={` text-xs px-2 py-1 rounded ${
            task.status === "Completed"
              ? "bg-green-600 text-white"
              : task.status === "In Progress"
              ? "bg-yellow-300 text-black"
              : "bg-gray-300 text-gray-800"
          }`}>
                              {task.status}
                            </span>
                          </td>
                          <td>{task.dueDate}</td>
                          <td>{task.department}</td>
                          <td className="flex gap-2">
                            <button className="text-blue-600" onClick={() => openEditForm(task)}>
                              <FaEdit />
                            </button>
                            <button className="text-red-600" onClick={() => handleDelete(task._id)}>
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-gray-500 py-4">
                          No tasks found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Mobile Cards */}
<div className="md:hidden space-y-4 mt-6">
  {filteredTasks.map((task) => (
    <div
      key={task._id}
      className="border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2 relative"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-base text-gray-900">{task.task}</h3>
          <p className="text-sm text-gray-600">Assigned to: {task.employeeName}</p>
          <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
        </div>

        <div className="relative">
          <button
            onClick={() =>
              setShowDropdown((prev) => (prev === task._id ? null : task._id))
            }
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ⋮
          </button>

          {showDropdown === task._id && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  setShowDropdown(null);
                  openEditForm(task);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => {
                  setShowDropdown(null);
                  handleDelete(task._id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mt-2">
        <span
  className={`text-xs px-2 py-1 rounded-full font-semibold ${
    task.priority === "High"
      ? "bg-red-600 text-white"          
      : task.priority === "Medium"
      ? "bg-yellow-300 text-gray-900"    
      : "bg-green-600 text-white"      
  }`}
>
  {task.priority}
</span>


        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold ${
            task.status === "Completed"
              ? "bg-green-600 text-white"
              : task.status === "In Progress"
              ? "bg-yellow-300 text-black"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-sm text-gray-500">Department: {task.department}</p>
    </div>
  ))}

  {/*  Mobile +Add Task Button */}
  <button
    onClick={openAddForm}
    className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg shadow hover:bg-purple-700 transition text-sm"
  >
    + Add Task
  </button>
</div>

          </>
        )}

        <AddEditTaskForm
          mode={formMode}
          taskData={taskToEdit}
          onSave={saveTask}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </main>
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color }) => {
  const colors = {
    yellow: "text-yellow-700 border-yellow-300",
    green: "text-green-700 border-green-300",
    red: "text-red-700 border-red-300",
    default: "text-gray-800 border-gray-200",
  };

  return (
    <div className={`flex justify-between items-center p-4 bg-white rounded-2xl shadow-md border ${colors[color] || colors.default}`}>
      <div>
        <h3 className={`text-2xl font-bold ${colors[color] || "text-gray-800"}`}>{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <div className={`text-3xl ${colors[color]?.split(" ")[0] || "text-purple-600"}`}>{icon}</div>
    </div>
  );
};

export default TasksPage;