
import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask, getTaskFilterOptions
} from "../controllers/taskController.js";

const taskrouter = express.Router();

taskrouter.get("/", getAllTasks);
taskrouter.post("/", createTask);
taskrouter.put("/:id", updateTask);
taskrouter.delete("/:id", deleteTask);
taskrouter.get("/filters/options", getTaskFilterOptions); 

export default taskrouter; 
