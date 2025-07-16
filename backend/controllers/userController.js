import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import UserSession from "../models/UserSessionModel.js";
import getDeviceInfo from "../utils/getDevice.js";

// ======================= REGISTER =======================
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmpassword } = req.body;

    if (!fullName || !email || !password || !confirmpassword) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ fullName, email: email.toLowerCase(), password: hashedPassword });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        department: user.department,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ======================= LOGIN =======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const { device } = getDeviceInfo(req.headers["user-agent"]);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    await UserSession.create({
      userId: user._id,
      ip,
      userAgent: req.headers["user-agent"],
      device,
      lastActive: new Date(),
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ======================= GET PROFILE =======================
const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, userData: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ======================= UPDATE PROFILE =======================
const updateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber, department, role } = req.body;
    const imagePath = req.file;

    const updateData = { fullName, phoneNumber, department, role };

    if (imagePath) {
      const uploaded = await cloudinary.uploader.upload(imagePath.path, {
        folder: "employee_profiles",
      });
      updateData.image = uploaded.secure_url;
    }

    await userModel.findByIdAndUpdate(req.userId, updateData);
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ======================= FORGOT PASSWORD =======================
const forgetpasswordUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send({ Status: "User not existed" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const resetLink = `${process.env.FRONTEND_URL}/reset_password/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password Link",
      text: resetLink,
    });

    res.send({ Status: "Success" });
  } catch (error) {
    res.send({ Status: "Error", error });
  }
};

// ======================= RESET PASSWORD =======================
const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    res.send({ Status: "Success" });
  } catch (error) {
    res.status(400).json({ Status: "Error", message: "Invalid or expired token" });
  }
};

// ======================= GET USER SETTINGS =======================
const getUserSettings = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("settings");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, settings: user.settings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ======================= UPDATE USER SETTINGS =======================
const updateUserSettings = async (req, res) => {
  try {
    const { notifications, security, system } = req.body;
    const updateFields = {};
    if (notifications) updateFields["settings.notifications"] = notifications;
    if (security) updateFields["settings.security"] = security;
    if (system) updateFields["settings.system"] = system;

    await userModel.findByIdAndUpdate(req.userId, { $set: updateFields });
    res.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ======================= CHANGE PASSWORD =======================
const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    const user = await userModel.findById(req.userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect current password" });
    if (newPassword !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ======================= GET USER SESSIONS =======================
const getUserSessions = async (req, res) => {
  try {
    const sessions = await UserSession.find({ userId: req.userId }).sort({ lastActive: -1 });
    const currentIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const currentUA = req.headers["user-agent"];

    const result = sessions.map((session) => ({
      ...session._doc,
      isCurrent: session.ip === currentIp && session.userAgent === currentUA,
    }));

    res.json({ success: true, sessions: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch sessions" });
  }
};

// ======================= SIGNOUT ALL SESSIONS =======================
const signOutAllSessions = async (req, res) => {
  try {
    const includeCurrent = req.query.includeCurrent === "true";
    const userId = req.userId;
    const currentIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const currentUA = req.headers["user-agent"];

    const sessions = await UserSession.find({ userId });

    const filter = includeCurrent
      ? { userId }
      : {
          userId,
          $or: [
            { ip: { $ne: currentIp } },
            { userAgent: { $ne: currentUA } },
          ],
        };

    await UserSession.deleteMany(filter);

    res.json({
      success: true,
      message: includeCurrent
        ? "All sessions including current session signed out"
        : "Other sessions signed out. Current session preserved",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error clearing sessions" });
  }
};


// ======================= EXPORT =======================
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgetpasswordUser,
  resetPassword,
  getUserSettings,
  updateUserSettings,
  changePassword,
  getUserSessions,
  signOutAllSessions,
};
