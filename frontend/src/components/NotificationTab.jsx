import React, { useState } from "react";

const NotificationTab = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    taskReminders: false,
    pushNotifications: true,
    weeklyReports: false,
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log("Saved Preferences:", preferences);
    alert("Preferences saved!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>

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
            className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-medium text-gray-700">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => togglePreference(key)}
              className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
                preferences[key] ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
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
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationTab;
