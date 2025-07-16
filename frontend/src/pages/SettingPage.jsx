import React, { useState, useContext } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaCog,
  FaBars,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import ProfileTab from "../components/ProfileTab";
import NotificationTab from "../components/NotificationTab";
import SecurityTab from "../components/SecurityTab";
import SystemTab from "../components/SystemTab";
import { AppContext } from "../context/AppContext";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { systemSettings } = useContext(AppContext);
  const isDark = systemSettings.theme === "dark";

  const renderTab = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Notifications":
        return <NotificationTab />;
      case "Security":
        return <SecurityTab />;
      case "System":
        return <SystemTab />;
      default:
        return null;
    }
  };

  const tabs = [
    { name: "Profile", icon: <FaUser /> },
    { name: "Notifications", icon: <FaBell /> },
    { name: "Security", icon: <FaLock /> },
    { name: "System", icon: <FaCog /> },
  ];

  const openSidebar = () => {
    document.dispatchEvent(new Event("openSidebar"));
  };

  return (
    <div className={`flex min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        {/* Mobile Top Navbar */}
        <div className="md:hidden mb-4">
          <div className={`flex items-center justify-between mb-2 border-b-2 pb-2 ${isDark ? "border-gray-700" : "border-black"}`}>
            <div className="flex items-center gap-3">
              <button className={`${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-700"} p-2 rounded-md shadow-md`} onClick={openSidebar}>
                <FaBars />
              </button>
              <h1 className={`${isDark ? "text-white" : "text-gray-800"} text-lg font-bold`}>Settings</h1>
            </div>
            <div className={`flex items-center gap-4 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
              <FaSearch className="text-lg cursor-pointer hover:text-blue-600" />
              <FaBell className="text-lg cursor-pointer hover:text-blue-600" />
            </div>
          </div>
          <p className={`text-xs mt-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Manage your account preferences and system configuration.
          </p>
        </div>

        {/* Desktop Heading */}
        <div className="mb-6">
          <h1 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>Settings</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} hidden md:block`}>
            Manage your account preferences and system configuration.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="overflow-x-auto whitespace-nowrap mb-6 border-b pb-2">
          <div className="inline-flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-md border-b-2 transition-all duration-300 text-sm font-medium ${
                  activeTab === tab.name
                    ? "border-purple-600 text-purple-600"
                    : `${isDark ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} border-transparent`
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`border rounded-xl p-6 shadow ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50"}`}>
          {renderTab()}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
