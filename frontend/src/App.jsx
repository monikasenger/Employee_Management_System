// App.jsx
import React, { useContext, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { AppProvider, AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import LandingPage from "./pages/Landingpage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TestimoniesPage from "./pages/TestimoniesPage";
import FeaturesPage from "./pages/FeaturesPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import AddEditEmployeeForm from "./components/AddEditEmployeeForm";
import TaskPage from "./pages/TaskPage";
import AddEditTaskForm from "./components/AddEditTaskForm";
import SettingsPage from "./pages/SettingPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// AppWrapper for theme & routes
const AppWrapper = () => {
  const { systemSettings } = useContext(AppContext);

  useEffect(() => {
    const themeClass =
      systemSettings.theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-white text-black";

    document.body.className = `min-h-screen transition-colors duration-300 ease-in-out ${themeClass}`;
  }, [systemSettings.theme]);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
  <Route path="/testimonies" element={<TestimoniesPage/>}/>
          <Route path="/features" element={<FeaturesPage />} />
    
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/add" element={<AddEditEmployeeForm />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/tasks/add" element={<AddEditTaskForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </>
  );
};

// Main App component wrapped with AppProvider
function App() {
  return (
    <AppProvider>
      <AppWrapper />
    </AppProvider>
  );
}

export default App;
