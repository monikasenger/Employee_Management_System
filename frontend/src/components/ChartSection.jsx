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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

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
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* 🔽 Chart Selector */}
      <div className="mb-6">
        <label htmlFor="chartSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Select Chart to Display:
        </label>
        <select
          id="chartSelect"
          value={selectedChart}
          onChange={handleChartChange}
          className="mt-1 block w-72 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="employees">Employees by Status</option>
          <option value="users">Users by Role</option>
          <option value="tasks">Tasks by Status</option>
          <option value="taskPerEmployee">Tasks per Employee</option>
          <option value="taskMonthWise">Tasks by Month</option>
        </select>
      </div>

      {/* 📊 Chart Display */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md transition-all">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          {selectedChart === "employees" && "🧑‍💼 Employee Status Overview"}
          {selectedChart === "users" && "👥 User Roles Distribution"}
          {selectedChart === "tasks" && "📋 Task Status Breakdown"}
          {selectedChart === "taskPerEmployee" && "📊 Tasks per Employee"}
          {selectedChart === "taskMonthWise" && "🗓️ Tasks Created per Month"}
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          {selectedChart === "employees" && employeeStatusData?.length > 0 ? (
            <PieChart>
              <Pie
                data={employeeStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {employeeStatusData.map((entry, index) => (
                  <Cell key={`cell-emp-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : selectedChart === "users" && employeesRoleData?.length > 0 ? (
           <PieChart width={400} height={300}>
  <Pie
    data={employeesRoleData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    innerRadius={60} // 🔘 Inner hole to create doughnut
    outerRadius={100}
    fill="#00C49F"
    label
  >
    {employeesRoleData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  <Cell key={`cell-task-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : selectedChart === "taskPerEmployee" && taskPerEmployeeData?.length > 0 ? (
            <BarChart data={taskPerEmployeeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="employee" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="taskCount" fill="#8884d8" barSize={40} radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : selectedChart === "taskMonthWise" && taskMonthWiseData?.length > 0 ? (
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
            <div className="text-center text-sm text-gray-500 font-medium">
              🚫 No data available to display
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;
