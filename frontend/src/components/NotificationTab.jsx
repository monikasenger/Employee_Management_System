import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NotificationTab = () => {
  const { backend, token, userData, loadUserProfileData, systemSettings } =
    useContext(AppContext);

  const isDark = systemSettings?.theme === "dark";

  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    taskReminders: false,
    pushNotifications: false,
    weeklyReports: false,
  });

  // Load existing preferences
  useEffect(() => {
    if (userData?.settings?.notifications) {
      setPreferences(userData.settings.notifications);
    }
  }, [userData]);

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${backend}/api/users/settings`,
        { notifications: preferences },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Notification preferences updated");
        await loadUserProfileData();
      } else {
        toast.error(res.data.message || "Failed to update preferences");
      }
    } catch (error) {
      toast.error("Server error while updating preferences");
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-xl ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-6 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        Notification Preferences
      </h2>

      <div className="space-y-5">
        {[
          {
            key: "emailNotifications",
            title: "Email Notifications",
            desc: "Receive important updates via email.",
          },
          {
            key: "taskReminders",
            title: "Task Reminders",
            desc: "Reminders for upcoming tasks.",
          },
          {
            key: "pushNotifications",
            title: "Push Notifications",
            desc: "Get alerts on your device.",
          },
          {
            key: "weeklyReports",
            title: "Weekly Reports",
            desc: "Summary report every week.",
          },
        ].map(({ key, title, desc }) => (
          <div
            key={key}
            className={`flex justify-between items-center p-4 border rounded-lg shadow-sm transition ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div>
              <h3
                className={`font-medium ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {title}
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {desc}
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => togglePreference(key)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
                preferences[key] ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${
                  preferences[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className={`px-6 py-2 rounded text-sm font-medium transition ${
            isDark
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationTab;
