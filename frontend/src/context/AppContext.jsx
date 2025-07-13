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

  // api for Get user profile
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/users/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // api for Get all employees
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

  // api for Get employee filter options (roles, statuses)
  const fetchEmployeeFilterOptions = async () => {
    try {
      const res = await axios.get(`${backend}/api/employees/filters/options`);
      setRoles(res.data.roles || []);
      setStatuses(res.data.statuses || []);
    } catch (error) {
      console.error("Error fetching employee filter options:", error);
    }
  };

  // api for Get all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${backend}/api/tasks`);
      setTasks(res.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // api for Get task filter options (statuses, priorities)
  const fetchTaskFilterOptions = async () => {
    try {
      const res = await axios.get(`${backend}/api/tasks/filters/options`);
      setTaskStatuses(res.data.statuses || []);
      setPriorities(res.data.priorities || []);
    } catch (error) {
      console.error("Error fetching task filter options:", error);
    }
  };

  //  Initial fetch on load
  useEffect(() => {
    fetchEmployees();
    fetchEmployeeFilterOptions();
    fetchTasks();
    fetchTaskFilterOptions();
  }, []);

  //  Load user data if token exists
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  // Shared context values
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
