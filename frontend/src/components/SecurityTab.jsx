import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const SecurityTab = () => {
  const { backend, token, loadUserProfileData, userData, systemSettings } =
    useContext(AppContext);
  const isDark = systemSettings?.theme === "dark";

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (userData?.settings?.security?.twoFactorAuth !== undefined) {
      setFormData((prev) => ({
        ...prev,
        twoFactorAuth: userData.settings.security.twoFactorAuth,
      }));
    }
  }, [userData]);

  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const res = await axios.get(`${backend}/api/users/sessions`, {
        headers: { token },
      });
      if (res.data.success) {
        setSessions(res.data.sessions);
      } else {
        toast.error("Failed to fetch sessions");
      }
    } catch (error) {
      toast.error("Error fetching sessions");
    } finally {
      setLoadingSessions(false);
    }
  };

  const handleSignOutAll = async () => {
    const confirmLogout = window.confirm("Do you also want to sign out from the current session?");
    try {
      const res = await axios.delete(
        `${backend}/api/users/sessions?includeCurrent=${confirmLogout}`,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        if (confirmLogout) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          loadSessions();
        }
      } else {
        toast.error(res.data.message || "Failed to sign out sessions");
      }
    } catch (error) {
      toast.error("Error signing out sessions");
    }
  };

  const toggle2FA = async () => {
    const updated2FA = !formData.twoFactorAuth;
    setFormData((prev) => ({ ...prev, twoFactorAuth: updated2FA }));

    try {
      const res = await axios.post(
        `${backend}/api/users/settings`,
        { security: { twoFactorAuth: updated2FA } },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("2FA updated successfully");
        loadUserProfileData();
      } else {
        toast.error(res.data.message || "Failed to update 2FA");
      }
    } catch (error) {
      toast.error("Error updating 2FA");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New and confirm passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${backend}/api/users/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          twoFactorAuth: formData.twoFactorAuth,
        });
      } else {
        toast.error(res.data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Error changing password");
    }
  };

  const handleLogoutSession = async (sessionId) => {
    try {
      const res = await axios.delete(`${backend}/api/users/sessions/${sessionId}`, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("Logged out from session");
        loadSessions();
      } else {
        toast.error(res.data.message || "Failed to logout");
      }
    } catch (error) {
      toast.error("Error logging out session");
    }
  };

  return (
    <div
      className={`max-w-xl mx-auto p-4 space-y-6 text-sm border rounded-lg ${
        isDark
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {/* Password Change */}
      <form onSubmit={handleSavePassword} className="space-y-3">
        <h2 className="text-xl font-semibold">Security Settings</h2>

        {["currentPassword", "newPassword", "confirmPassword"].map((field, index) => (
          <div key={index}>
            <label className="block mb-1 font-medium capitalize">
              {field === "currentPassword"
                ? "Current Password"
                : field === "newPassword"
                ? "New Password"
                : "Confirm New Password"}
            </label>
            <input
              type="password"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded ${
                isDark
                  ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300"
              }`}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>

      {/* Two-Factor Auth Toggle */}
      <div
        className={`flex justify-between items-center p-3 rounded border ${
          isDark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div>
          <p className="font-medium">Two-Factor Authentication (2FA)</p>
          <p className="text-xs text-gray-500">Extra security for your account</p>
        </div>
        <button
          onClick={toggle2FA}
          className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
            formData.twoFactorAuth ? "bg-purple-600" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full transform duration-300 ${
              formData.twoFactorAuth ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Sessions Table */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Active Sessions</h2>
          <button
            onClick={handleSignOutAll}
            className="text-xs text-red-600 hover:underline"
          >
            Sign out all sessions
          </button>
        </div>

        {loadingSessions ? (
          <p className="text-sm text-gray-400">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-gray-400">No active sessions found</p>
        ) : (
          <table className="w-full text-xs rounded overflow-hidden border">
            <thead
              className={`${
                isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              <tr>
                <th className="px-4 py-2 text-left">Device</th>
                <th className="text-left">IP</th>
                <th className="text-left">Location</th>
                <th className="text-left">Last Active</th>
                <th className="text-left">Status / Action</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const latestTime = Math.max(
                  ...sessions.map((s) => new Date(s.lastActive).getTime())
                );
                return sessions.slice(0, 4).map((session) => {
                  const isCurrent =
                    new Date(session.lastActive).getTime() === latestTime;

                  return (
                    <tr
                      key={session._id}
                      className={`border-t ${
                        isDark ? "border-gray-700 text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <td className="px-4 py-2">{session.device}</td>
                      <td>{session.ip}</td>
                      <td>{session.location || "Unknown"}</td>
                      <td>{new Date(session.lastActive).toLocaleString()}</td>
                      <td>
                        {isCurrent ? (
                          <span className="text-green-500 font-semibold">Current</span>
                        ) : (
                          <button
                            onClick={() => handleLogoutSession(session._id)}
                            className="text-red-500 hover:underline"
                          >
                            Logout
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SecurityTab;
