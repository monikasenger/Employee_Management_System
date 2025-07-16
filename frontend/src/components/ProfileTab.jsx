import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import uploadIcon from "../assets/upload_icon.png";

const ProfileTab = () => {
  const {
    userData,
    setUserData,
    token,
    backend,
    loadUserProfileData,
    systemSettings,
  } = useContext(AppContext);

  const isDark = systemSettings?.theme === "dark";

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "",
    role: "",
  });

  const roleOptions = [
    "Employee",
    "Administrator",
    "Manager",
    "Developer",
    "HR",
    "Intern",
  ];
  const deptOptions = ["Not Assigned", "IT", "HR", "Finance", "Marketing"];

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        department: userData.department || "",
        role: userData.role || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setIsEdit(false);
    if (userData) {
      setFormData({
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        department: userData.department,
        role: userData.role,
      });
    }
    setImage(null);
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("userId", userData._id);
      form.append("fullName", formData.fullName);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("department", formData.department);
      form.append("role", formData.role);
      if (image) {
        form.append("image", image);
      }

      const { data } = await axios.post(
        backend + "/api/users/update-profile",
        form,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    userData && (
      <div
        className={`max-w-3xl mx-auto p-4 sm:p-6 rounded-lg shadow-sm text-sm border ${
          isDark
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        <h2
          className={`text-base sm:text-lg font-semibold mb-5 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Profile Information
        </h2>

        {/* Profile Image */}
        {isEdit ? (
          <label htmlFor="image">
            <div className="flex flex-col items-center relative cursor-pointer">
              <img
                className="w-36 h-36 rounded-full border-4 object-cover opacity-80"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={uploadIcon}
                  alt="Upload Icon"
                  className="w-10 h-10 p-1 rounded-full shadow"
                />
              </div>
            </div>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="flex flex-col items-center relative">
            <img
              src={userData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
            />
          </div>
        )}

        {/* Profile Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label
              className={`block mb-1 font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              readOnly={!isEdit}
              className={`w-full border px-3 py-1.5 rounded ${
                isEdit
                  ? isDark
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-600"
              }`}
            />
          </div>

          <div>
            <label
              className={`block mb-1 font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full border px-3 py-1.5 rounded bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label
              className={`block mb-1 font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={!isEdit}
              className={`w-full border px-3 py-1.5 rounded ${
                isDark ? "bg-gray-800 text-white border-gray-600" : ""
              }`}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block mb-1 font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!isEdit}
              className={`w-full border px-3 py-1.5 rounded ${
                isDark ? "bg-gray-800 text-white border-gray-600" : ""
              }`}
            >
              {deptOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              className={`block mb-1 font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Phone
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              readOnly={!isEdit}
              className={`w-full border px-3 py-1.5 rounded ${
                isEdit
                  ? isDark
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-white border-gray-300"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          {isEdit ? (
            <>
              <button
                onClick={handleCancel}
                className={`px-4 py-1.5 rounded border ${
                  isDark
                    ? "text-gray-300 border-gray-500 hover:bg-gray-700"
                    : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default ProfileTab;
