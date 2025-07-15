import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


import {AppProvider} from "./context/AppContext"; // ✅ Cleaned and default exported
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
          <Route path="/testimonies" element={<TestimoniesPage />} />
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
    </AppProvider>
  );
}

export default App;
