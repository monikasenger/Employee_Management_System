import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, forgetpasswordUser,resetPassword } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userrouter = express.Router();

userrouter.post("/signup", registerUser);
userrouter.post("/login", loginUser);
userrouter.get("/get-profile", authUser, getProfile);

userrouter.post("/update-profile",  upload.single('image'), authUser,updateProfile);
userrouter.post('/forget-password',forgetpasswordUser)
userrouter.post("/reset-password", resetPassword);

export default userrouter;
