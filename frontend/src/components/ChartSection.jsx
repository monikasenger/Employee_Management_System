import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  
} from "recharts";
import { AppContext } from "../context/AppContext";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a78bfa",
  "#34d399",
  "#f87171",
  "#facc15",
];

const ChartSection = ({
  selectedChart,
  handleChartChange,
  employeeStatusData,
  employeesRoleData,
  taskStatusData,
  taskPerEmployeeData,
  taskMonthWiseData,
}) => {
  const { systemSettings } = useContext(AppContext);
  const isDark = systemSettings?.theme === "dark";

  return (
    <div
      className={`${
        isDark
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-gray-50 border-gray-200 text-gray-800"
      } border rounded-2xl p-6 sm:p-8 shadow-sm`}
    >
      {/* 🔽 Chart Selector */}
      <div className="mb-6">
        <label
          htmlFor="chartSelect"
          className={`block text-sm font-medium mb-2 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Select Chart to Display:
        </label>
        <select
          id="chartSelect"
          value={selectedChart}
          onChange={handleChartChange}
          className={`mt-1 block w-72 pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-gray-800 border-gray-600 text-white focus:ring-purple-500"
              : "bg-white border-gray-300 text-black focus:ring-indigo-500"
          }`}
        >
          <option value="employees">Employees by Status</option>
          <option value="users">Users by Role</option>
          <option value="tasks">Tasks by Status</option>
          <option value="taskPerEmployee">Tasks per Employee</option>
          <option value="taskMonthWise">Tasks by Month</option>
        </select>
      </div>

      {/*  Chart Display */}
      <div
        className={`rounded-2xl p-6 sm:p-8 shadow-md transition-all border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2
          className={`text-lg sm:text-xl font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          {selectedChart === "employees" && "🧑‍💼 Employee Status Overview"}
          {selectedChart === "users" && "👥 User Roles Distribution"}
          {selectedChart === "tasks" && "📋 Task Status Breakdown"}
          {selectedChart === "taskPerEmployee" && "📊 Tasks per Employee"}
          {selectedChart === "taskMonthWise" && "🗓️ Tasks Created per Month"}
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          {selectedChart === "employees" && employeeStatusData?.length > 0 ? (
          <BarChart
  width={500}
  height={300}
  data={employeeStatusData}
  layout="vertical"
  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis type="number" />
  <YAxis dataKey="name" type="category" />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" barSize={20}>
    {employeeStatusData.map((entry, index) => (
      <Cell
        key={`cell-emp-${index}`}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Bar>
</BarChart>
          ) : selectedChart === "users" && employeesRoleData?.length > 0 ? (
            <PieChart>
              <Pie
                data={employeesRoleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#00C49F"
                label
              >
                {employeesRoleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : selectedChart === "tasks" && taskStatusData?.length > 0 ? (
            <PieChart>
              <Pie
                data={taskStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {taskStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-task-${index}`}
                    fill={COLORS[(index + 2) % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : selectedChart === "taskPerEmployee" &&
            taskPerEmployeeData?.length > 0 ? (
            <BarChart data={taskPerEmployeeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="employee" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="taskCount"
                fill="#8884d8"
                barSize={40}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          ) : selectedChart === "taskMonthWise" &&
            taskMonthWiseData?.length > 0 ? (
            <ComposedChart data={taskMonthWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="unitsSold"
                fill="#1d4ed8"
                barSize={40}
                radius={[6, 6, 0, 0]}
                name="Units Sold"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalTransaction"
                stroke="#f97316"
                strokeWidth={3}
                activeDot={{ r: 6 }}
                name="Total Transaction"
              />
            </ComposedChart>
          ) : (
            <div
              className={`text-center text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              🚫 No data available to display
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;
