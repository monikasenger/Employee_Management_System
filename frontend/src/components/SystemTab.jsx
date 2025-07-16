import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const SystemTab = () => {
  const {
    backend,
    token,
    userData,
    setSystemSettings,
    loadUserProfileData,
    systemSettings,
  } = useContext(AppContext);

  const isDark = systemSettings?.theme === "dark";

  const [settings, setSettings] = useState(
    userData?.settings?.system || {
      theme: "light",
      dateFormat: "dd/mm/yyyy",
      timezone: "IST",
      language: "en",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${backend}/api/users/settings`,
        { system: settings },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("System settings updated successfully");
        setSystemSettings(settings);
        loadUserProfileData();
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Failed to update system settings");
      console.error(error);
    }
  };

  const handleExport = () => {
    alert("Data exported successfully.");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your data?")) {
      alert("Your data has been deleted.");
    }
  };

  return (
    <div
      className={`max-w-xl mx-auto p-4 space-y-5 text-sm rounded-lg border ${
        isDark
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div>
        <h2 className="text-lg font-semibold">System Preferences</h2>
      </div>

      {/* Theme */}
      <div>
        <label className="block font-medium mb-1">Theme</label>
        <select
          name="theme"
          value={settings.theme}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            isDark ? "bg-gray-800 border-gray-600 text-white" : ""
          }`}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Date Format */}
      <div>
        <label className="block font-medium mb-1">Date Format</label>
        <select
          name="dateFormat"
          value={settings.dateFormat}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            isDark ? "bg-gray-800 border-gray-600 text-white" : ""
          }`}
        >
          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
          <option value="yyyy/mm/dd">YYYY/MM/DD</option>
        </select>
      </div>

      {/* Timezone */}
      <div>
        <label className="block font-medium mb-1">Timezone</label>
        <select
          name="timezone"
          value={settings.timezone}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            isDark ? "bg-gray-800 border-gray-600 text-white" : ""
          }`}
        >
          <option value="IST">IST (India Standard Time)</option>
          <option value="GMT">GMT (Greenwich Mean Time)</option>
          <option value="EST">EST (Eastern Standard Time)</option>
          <option value="PST">PST (Pacific Standard Time)</option>
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="block font-medium mb-1">Language</label>
        <select
          name="language"
          value={settings.language}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${
            isDark ? "bg-gray-800 border-gray-600 text-white" : ""
          }`}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Data Management */}
      <div>
        <h3 className="text-base font-semibold mb-1">Data Management</h3>
        <p className="text-xs text-gray-500 mb-3">
          Export or delete your data as per your preferences.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className={`border px-4 py-1 rounded transition text-sm ${
              isDark
                ? "border-green-500 text-green-400 hover:bg-green-800"
                : "border-green-600 text-green-600 hover:bg-green-50"
            }`}
          >
            Export Data
          </button>
          <button
            onClick={handleDelete}
            className={`border px-4 py-1 rounded transition text-sm ${
              isDark
                ? "border-red-500 text-red-400 hover:bg-red-800"
                : "border-red-600 text-red-600 hover:bg-red-50"
            }`}
          >
            Delete Data
          </button>
        </div>
      </div>

      {/* Save Settings */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemTab;
