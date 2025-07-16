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
  const { employees, tasks, users, systemSettings } = useContext(AppContext);
  const [selectedChart, setSelectedChart] = useState("employees");

  const totalEmployees = employees.length;
  const totalTasks = tasks.length;
  const totalInterns = users ? users.filter((u) => u.role === "Intern").length : 0;
  const activeProjects = employees.filter((emp) => emp.status === "Active").length;

  const employeeStatusData = [
    { name: "Active", value: employees.filter((e) => e.status === "Active").length },
    { name: "Inactive", value: employees.filter((e) => e.status !== "Active").length },
  ];

  const employeesRoleCounts = employees.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const employeesRoleData = Object.entries(employeesRoleCounts).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  const taskStatusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  const taskStatusData = Object.entries(taskStatusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

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
  const isDark = systemSettings?.theme === "dark";

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen transition duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        {/* Mobile Header */}
        <div className="md:hidden mb-4">
          <div
            className={`flex items-center justify-between mb-2 pb-2 border-b-2 ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                className={`p-2 rounded-md shadow-md ${
                  isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
                }`}
                onClick={openSidebar}
              >
                <FaBars />
              </button>
              <h1 className="text-lg font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
              <FaSearch className="text-lg cursor-pointer hover:text-blue-600" />
              <FaBell className="text-lg cursor-pointer hover:text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 mt-3">
            Welcome back! Here's what’s happening at your company.
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Welcome back! Here's what’s happening at your company.
          </p>
        </div>

        {/* Metrics */}
        {/* Metrics */}
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
  <MetricCard icon={<FaUserTie />} title="Total Employees" value={totalEmployees} isDark={isDark} />
  <MetricCard icon={<FaTasks />} title="Total Tasks Assigned" value={totalTasks} isDark={isDark} />
  <MetricCard icon={<FaUserGraduate />} title="Interns Count" value={totalInterns} isDark={isDark} />
  <MetricCard icon={<FaChartLine />} title="Active Projects" value={activeProjects} isDark={isDark} />
</div>



        {/* Charts Section */}
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

//  MetricCard Component
const MetricCard = ({ icon, title, value = 0, isDark }) => {
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const titleColor = isDark ? "text-gray-400" : "text-gray-500";
  const iconBg = isDark ? "bg-blue-900" : "bg-blue-100";
  const iconText = isDark ? "text-blue-300" : "text-blue-600";

  return (
    <div className={`rounded-2xl p-4 sm:p-5 flex justify-between items-center shadow hover:shadow-md transition duration-300 ${bgColor} ${borderColor} border`}>
      <div>
        <p className={`text-xs sm:text-sm ${titleColor}`}>{title}</p>
        <p className={`text-lg sm:text-xl font-bold ${textColor}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-full text-xl sm:text-2xl ${iconBg} ${iconText}`}>
        {icon}
      </div>
    </div>
  );
};


export default DashboardPage;
