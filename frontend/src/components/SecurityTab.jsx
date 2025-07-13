import React, { useState } from "react";

const SecurityTab = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggle2FA = () => {
    setFormData((prev) => ({
      ...prev,
      twoFactorAuth: !prev.twoFactorAuth,
    }));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New and Confirm passwords do not match.");
      return;
    }
    alert("Password changed successfully!");
  };

  const handleSignOutAll = () => {
    alert("All other sessions signed out!");
  };

  return (
    <div className="max-w-xl mx-auto p-2 sm:p-3 md:p-4 space-y-4 text-sm">
      {/* 🔐 Heading */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Security Settings</h2>
        <h3 className="text-base font-medium text-gray-700 mt-1">Change Password</h3>
        <p className="text-xs text-gray-500 mb-2">Update your account password regularly to protect your account.</p>
      </div>

      {/* 🔐 Change Password */}
      <div>
        <form onSubmit={handleSavePassword} className="space-y-2">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* 🔐 Two-Factor Authentication */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Two-Factor Authentication (2FA)</h2>
        <div className="flex justify-between items-center p-2 border rounded-lg shadow-sm">
          <div>
            <p className="font-medium text-gray-700">Enable Two-Factor Authentication</p>
            <p className="text-xs text-gray-500">Extra security using SMS or authenticator app</p>
          </div>
          <button
            onClick={toggle2FA}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
              formData.twoFactorAuth ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${
                formData.twoFactorAuth ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 🧑‍💻 Active Sessions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Active Sessions</h2>
          <button
            onClick={handleSignOutAll}
            className="text-xs text-red-600 hover:underline"
          >
            Sign out all sessions
          </button>
        </div>

        <div className="border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-2">Device</th>
                <th>Location</th>
                <th>Last Active</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t">
                <td className="px-4 py-2">Chrome on Windows</td>
                <td>New Delhi, India</td>
                <td>Just now</td>
                <td className="text-green-600 font-semibold">Current Session</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Safari on iPhone</td>
                <td>Mumbai, India</td>
                <td>Yesterday</td>
                <td className="text-gray-500">Logged Out</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
