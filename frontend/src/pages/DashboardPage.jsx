import { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaUserTie,
  FaTasks,
  FaUserGraduate,
  FaChartLine,
  FaSearch,
  FaBell,
  FaBars,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import ChartSection from "../components/ChartSection";

const DashboardPage = () => {
  const { employees, tasks, users } = useContext(AppContext);
  const [selectedChart, setSelectedChart] = useState("employees");

  const totalEmployees = employees.length;
  const totalTasks = tasks.length;
  const totalInterns = users ? users.filter((u) => u.role === "Intern").length : 0;
  const activeProjects = employees.filter((emp) => emp.status === "Active").length;

  // 1. Employee Status Data
  const employeeStatusData = [
    { name: "Active", value: employees.filter((e) => e.status === "Active").length },
    { name: "Inactive", value: employees.filter((e) => e.status !== "Active").length },
  ];

  // 2. Employees by Role
  const employeesRoleCounts = employees.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const employeesRoleData = Object.entries(employeesRoleCounts).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  // 3. Tasks by Status
  const taskStatusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  const taskStatusData = Object.entries(taskStatusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  // 4. Tasks per Employee (including unknown employees)
  const taskPerMap = {};

  tasks.forEach((task) => {
    const empName = task.employeeName || "Unknown";
    if (!taskPerMap[empName]) {
      taskPerMap[empName] = 0;
    }
    taskPerMap[empName]++;
  });

  const taskPerEmployeeData = Object.entries(taskPerMap).map(([employee, taskCount]) => ({
    employee,
    taskCount,
  }));

  // 5. Tasks by Month
  const taskMonthWiseData = tasks.reduce((acc, task) => {
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      const month = date.toLocaleString("default", { month: "short", year: "numeric" });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});
  const formattedMonthWiseData = Object.entries(taskMonthWiseData).map(([month, tasks]) => ({
    month,
    tasks,
  }));

  const handleChartChange = (e) => setSelectedChart(e.target.value);
  const openSidebar = () => document.dispatchEvent(new Event("openSidebar"));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        {/* 🔹 Mobile Top Navbar */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between mb-2 border-b-2 border-black pb-2">
            <div className="flex items-center gap-3">
              <button className="text-gray-700 bg-white p-2 rounded-md shadow-md" onClick={openSidebar}>
                <FaBars />
              </button>
              <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <FaSearch className="text-lg cursor-pointer hover:text-blue-600" />
              <FaBell className="text-lg cursor-pointer hover:text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Welcome back! Here's what’s happening at your company.
          </p>
        </div>

        {/* 🔹 Desktop Heading */}
        <div className="hidden md:block mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here's what’s happening at your company.
          </p>
        </div>

        {/* 🔸 Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <MetricCard
            icon={<FaUserTie />}
            title="Total Employees"
            value={totalEmployees}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <MetricCard
            icon={<FaTasks />}
            title="Total Tasks Assigned"
            value={totalTasks}
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <MetricCard
            icon={<FaUserGraduate />}
            title="Interns Count"
            value={totalInterns}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <MetricCard
            icon={<FaChartLine />}
            title="Active Projects"
            value={activeProjects}
            bgColor="bg-pink-100"
            iconColor="text-pink-600"
          />
        </div>

        {/* 🔸 Chart Section */}
        <ChartSection
          selectedChart={selectedChart}
          handleChartChange={handleChartChange}
          employeeStatusData={employeeStatusData}
          employeesRoleData={employeesRoleData}
          taskStatusData={taskStatusData}
          taskPerEmployeeData={taskPerEmployeeData}
          taskMonthWiseData={formattedMonthWiseData}
        />
      </main>
    </div>
  );
};

// 💠 Metric Card Component
const MetricCard = ({
  icon,
  title,
  value = 0,
  bgColor = "bg-blue-100",
  iconColor = "text-blue-600",
}) => (
  <div className="bg-white border border-blue-100 rounded-2xl p-4 sm:p-5 flex justify-between items-center shadow hover:shadow-md transition duration-300">
    <div>
      <p className="text-xs sm:text-sm text-gray-500">{title}</p>
      <p className="text-lg sm:text-xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${bgColor}`}>
      <div className={`text-xl sm:text-2xl ${iconColor}`}>{icon}</div>
    </div>
  </div>
);

export default DashboardPage;
