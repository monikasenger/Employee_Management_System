import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";

// Register User
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

    const newUser = new userModel({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

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

// Login User
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
    res.json({ success: true, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Update Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { fullName, phoneNumber, department, role } = req.body;
    const imagePath = req.file;

    if (!fullName || !phoneNumber || !department || !role) {
      return res.status(400).json({ success: false, message: "Missing profile fields" });
    }

    const updatedFields = { fullName, phoneNumber, department, role };

    if (imagePath) {
      const uploadedImage = await cloudinary.uploader.upload(imagePath.path, {
        folder: "employee_profiles",
      });
      const imageURL = uploadedImage.secure_url;
       await userModel.findByIdAndUpdate(userId, {image:imageURL});
    }

   
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Forget Password Controller
const forgetpasswordUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.RESET_TOKEN, { expiresIn: "15m" });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"EmployEase" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your EmployEase Password",
      html: `
        <p>Hello ${user.fullName || "User"},</p>
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Forget Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res.status(400).json({ success: false, message: "Token and new password required" });

    const decoded = jwt.verify(token, process.env.RESET_TOKEN);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Invalid or expired token" });
  }
};


export { registerUser, loginUser, getProfile, updateProfile ,forgetpasswordUser,resetPassword};