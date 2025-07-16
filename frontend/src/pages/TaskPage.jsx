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
import moment from "moment-timezone";

const formatMap = {
  "dd/mm/yyyy": "DD/MM/YYYY",
  "mm/dd/yyyy": "MM/DD/YYYY",
  "yyyy/mm/dd": "YYYY/MM/DD",
};

const SummaryCard = ({ title, value, icon, color, isDark }) => {
  const colorThemes = {
    yellow: {
      text: isDark ? "text-yellow-300" : "text-yellow-700",
      border: isDark ? "border-yellow-600" : "border-yellow-300",
      bg: isDark ? "bg-gray-800" : "bg-white",
    },
    green: {
      text: isDark ? "text-green-300" : "text-green-700",
      border: isDark ? "border-green-600" : "border-green-300",
      bg: isDark ? "bg-gray-800" : "bg-white",
    },
    red: {
      text: isDark ? "text-red-300" : "text-red-700",
      border: isDark ? "border-red-600" : "border-red-300",
      bg: isDark ? "bg-gray-800" : "bg-white",
    },
    default: {
      text: isDark ? "text-gray-200" : "text-gray-800",
      border: isDark ? "border-gray-600" : "border-gray-200",
      bg: isDark ? "bg-gray-800" : "bg-white",
    },
  };

  const theme = colorThemes[color] || colorThemes.default;

  return (
    <div className={`flex justify-between items-center p-4 rounded-2xl shadow-md border ${theme.border} ${theme.bg}`}>
      <div>
        <h3 className={`text-2xl font-bold ${theme.text}`}>{value}</h3>
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>{title}</p>
      </div>
      <div className={`text-3xl ${theme.text}`}>{icon}</div>
    </div>
  );
};

const TasksPage = () => {
  const {
    backend,
    tasks,
    fetchTasks,
    loading,
    taskstatuses,
    priorities,
    systemSettings,
  } = useContext(AppContext);

  const theme = systemSettings?.theme || "light";
  const dateFormat = systemSettings?.dateFormat || "dd/mm/yyyy";
  const timezone = systemSettings?.timezone || "IST";
  const isDark = theme === "dark";

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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

  const textClass = isDark ? "text-white" : "text-gray-800";
  const bgClass = isDark ? "bg-gray-900" : "bg-white";
  const borderClass = isDark ? "border-gray-700" : "border-gray-200";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";

  return (
    <div className={`flex min-h-screen ${bgClass} ${textClass}`}>
      <Sidebar />
      <main className="flex-1 px-6 py-6">
        {!showForm && (
          <>
            <div className={`md:hidden flex items-center justify-between mb-4 border-b-2 ${isDark ? "border-white" : "border-black"} pb-2`}>
              <div className="flex items-center gap-3">
                <button onClick={openSidebar} className={`p-2 rounded-md shadow-md ${bgClass}`}>
                  <FaBars className={textClass} />
                </button>
                <h1 className={`text-lg font-bold ${textClass}`}>Tasks</h1>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <FaSearch className="text-lg cursor-pointer hover:text-blue-400" />
                <FaBell className="text-lg cursor-pointer hover:text-blue-400" />
              </div>
            </div>

            <div className="hidden md:flex justify-between items-center mb-6">
              <div>
                <h1 className={`text-3xl font-bold ${textClass}`}>Tasks</h1>
                <p className="text-sm text-gray-400 mt-1">Manage and track all assigned tasks across departments.</p>
              </div>
              <button
                onClick={openAddForm}
                className="border border-purple-500 text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition text-sm"
              >
                + Add Task
              </button>
            </div>

            {/* Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <SummaryCard title="Total Tasks" value={totalTasks} icon={<FaTasks />} isDark={isDark} />
              <SummaryCard title="In Progress" value={inProgress} icon={<FaSpinner className="animate-spin" />} color="yellow" isDark={isDark} />
              <SummaryCard title="Completed" value={completed} icon={<FaCheckCircle />} color="green" isDark={isDark} />
              <SummaryCard title="Overdue" value={overdue} icon={<FaExclamationTriangle />} color="red" isDark={isDark} />
            </div>

            {/* Filters */}
            <div className={`border ${borderClass} rounded-xl p-4 sm:p-6 mb-6 ${cardBg}`}>
              <h2 className={`text-base sm:text-lg font-semibold ${textClass} mb-4`}>All Tasks</h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full border rounded-md py-2 pl-10 pr-4 text-sm ${
                      isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
                    }`}
                  />
                  <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                </div>
                <div className="flex gap-3">
                  <select className={`border text-sm rounded-md px-3 py-2 ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"}`} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="All">All Status</option>
                    {(taskstatuses || []).map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                  <select className={`border text-sm rounded-md px-3 py-2 ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"}`} value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
                    <option value="All">All Priority</option>
                    {(priorities || []).map((priority) => <option key={priority} value={priority}>{priority}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Task Table */}
            <div className={`hidden md:block border rounded-2xl overflow-hidden ${cardBg} ${borderClass}`}>
              {loading ? (
                <div className="text-center py-10 text-purple-400 font-medium">Loading tasks...</div>
              ) : (
             <table className={`w-full text-sm ${isDark ? "text-white" : "text-gray-700"}`}>
  <thead className={isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600 font-medium"}>
    <tr>
      <th className="text-left px-6 py-3">Task</th>
      <th className="text-left px-6 py-3">Employee Name</th>
      <th className="text-left px-6 py-3">Priority</th>
      <th className="text-left px-6 py-3">Status</th>
      <th className="text-left px-6 py-3">Due Date</th>
      <th className="text-left px-6 py-3">Department</th>
      <th className="text-left px-6 py-3">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredTasks.length > 0 ? (
      filteredTasks.map((task) => (
        <tr key={task._id} className="border-t">
          <td className="px-6 py-3">{task.task}</td>
          <td className="px-6 py-3">{task.employeeName}</td>
          <td className="px-6 py-3">
            <span className={`text-xs px-2 py-1 rounded ${task.priority === "High"
              ? "bg-red-500 text-white"
              : task.priority === "Medium"
              ? "bg-yellow-400 text-black"
              : "bg-green-200 text-black"
            }`}>
              {task.priority}
            </span>
          </td>
          <td className="px-6 py-3">
            <span className={`text-xs px-2 py-1 rounded ${task.status === "Completed"
              ? "bg-green-600 text-white"
              : task.status === "In Progress"
              ? "bg-yellow-300 text-black"
              : "bg-gray-300 text-gray-800"
            }`}>
              {task.status}
            </span>
          </td>
          <td className="px-6 py-3">
            {moment(task.dueDate)
              .tz(timezone)
              .format(`${formatMap[dateFormat]} hh:mm A z`)}
          </td>
          <td className="px-6 py-3">{task.department}</td>
          <td className="px-6 py-3 flex gap-2">
            <button className="text-blue-400" onClick={() => openEditForm(task)}><FaEdit /></button>
            <button className="text-red-500" onClick={() => handleDelete(task._id)}><FaTrashAlt /></button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7" className="text-center py-4 text-gray-400">No tasks found.</td>
      </tr>
    )}
  </tbody>
</table>

              )}
            </div>
          </>
        )}
        <AddEditTaskForm mode={formMode} taskData={taskToEdit} onSave={saveTask} showForm={showForm} setShowForm={setShowForm} />
      </main>
    </div>
  );
};

export default TasksPage;
