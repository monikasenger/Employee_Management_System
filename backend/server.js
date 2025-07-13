
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";



dotenv.config();
connectDB();
connectCloudinary();
const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes); 
app.use("/api/users",userRoutes);

// Test route
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
