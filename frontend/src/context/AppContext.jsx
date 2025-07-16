// AppContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskstatuses, setTaskStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== System Settings =====
  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    dateFormat: "dd/mm/yyyy",
    timezone: "IST",
    language: "en",
  });

  // ===== Load User Profile =====
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/users/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
        if (data.userData.settings?.system) {
          const newSettings = data.userData.settings.system;
          setSystemSettings(newSettings);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ===== Sync global system settings changes =====
  useEffect(() => {
    if (systemSettings?.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [systemSettings]);

  // ===== API: Employees & Tasks =====
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backend}/api/employees`);
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeFilterOptions = async () => {
    try {
      const res = await axios.get(`${backend}/api/employees/filters/options`);
      setRoles(res.data.roles || []);
      setStatuses(res.data.statuses || []);
    } catch (error) {
      console.error("Error fetching employee filter options: ", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${backend}/api/tasks`);
      setTasks(res.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const fetchTaskFilterOptions = async () => {
    try {
      const res = await axios.get(`${backend}/api/tasks/filters/options`);
      setTaskStatuses(res.data.statuses || []);
      setPriorities(res.data.priorities || []);
    } catch (error) {
      console.error("Error fetching task filter options:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchEmployeeFilterOptions();
    fetchTasks();
    fetchTaskFilterOptions();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    backend,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    employees,
    fetchEmployees,
    roles,
    statuses,
    loading,
    tasks,
    taskstatuses,
    priorities,
    fetchTasks,
    fetchTaskFilterOptions,
    systemSettings,
    setSystemSettings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
