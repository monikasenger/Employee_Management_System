import express from "express";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getUniqueRolesAndStatuses,
} from "../controllers/employeeController.js";

const employeerouter = express.Router();


employeerouter.get("/", getAllEmployees);           // GET all
employeerouter.post("/", createEmployee);           // CREATE
employeerouter.put("/:id", updateEmployee);         // UPDATE by ID
employeerouter.delete("/:id", deleteEmployee);      // DELETE by ID
employeerouter.get("/filters/options", getUniqueRolesAndStatuses);

export default employeerouter;
