import React, { useState } from "react";

const SystemTab = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    dateFormat: "dd/mm/yyyy",
    timezone: "IST",
    language: "en",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleExport = () => {
    alert("Data exported successfully.");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your data?")) {
      alert("Your data has been deleted.");
    }
  };

  const handleSave = () => {
    alert("System settings saved.");
  };

  return (
    <div className="max-w-xl mx-auto p-3 sm:p-4 md:p-5 space-y-4 text-sm">
      {/*  Heading */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">System Preferences</h2>
      </div>

      {/*  Theme */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Theme</label>
        <select
          name="theme"
          value={settings.theme}
          onChange={handleChange}
          className="w-full border rounded px-3 py-1"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/*  Date Format */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Date Format</label>
        <select
          name="dateFormat"
          value={settings.dateFormat}
          onChange={handleChange}
          className="w-full border rounded px-3 py-1"
        >
          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
          <option value="yyyy/mm/dd">YYYY/MM/DD</option>
        </select>
      </div>

      {/*  Timezone */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Timezone</label>
        <select
          name="timezone"
          value={settings.timezone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-1"
        >
          <option value="IST">IST (India Standard Time)</option>
          <option value="GMT">GMT (Greenwich Mean Time)</option>
          <option value="EST">EST (Eastern Standard Time)</option>
          <option value="PST">PST (Pacific Standard Time)</option>
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Language</label>
        <select
          name="language"
          value={settings.language}
          onChange={handleChange}
          className="w-full border rounded px-3 py-1"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

     {/*  Data Management */}
<div>
  <h3 className="text-base font-semibold text-gray-800 mb-1">Data Management</h3>
  <p className="text-xs text-gray-500 mb-3">
    Export or delete your data as per your preferences.
  </p>
  <div className="flex flex-wrap gap-3">
    <button
      onClick={handleExport}
      className="border border-green-600 text-green-600 px-4 py-1 rounded hover:bg-green-50 transition text-sm"
    >
      Export Data
    </button>
    <button
      onClick={handleDelete}
      className="border border-red-600 text-red-600 px-4 py-1 rounded hover:bg-red-50 transition text-sm"
    >
      Delete Data
    </button>
  </div>
</div>


      {/*  Save Button */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-1.5 rounded hover:bg-blue-700 transition text-sm"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemTab;
