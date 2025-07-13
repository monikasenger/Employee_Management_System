import Employee from "../models/EmployeeModel.js";

// GET all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// CREATE employee
export const createEmployee = async (req, res) => {
  try {
    const { name, role, email, department, status } = req.body;
    const employee = new Employee({ name, role, email, department, status });
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee" });
  }
};

// UPDATE employee
export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee" });
  }
};

// DELETE employee
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee" });
  }
};
// Unique roles & statuses controller
export const getUniqueRolesAndStatuses = async (req, res) => {
  try {
    const employees = await Employee.find({}, "role status"); // Only role and status
    const roles = [...new Set(employees.map(emp => emp.role))];
    const statuses = [...new Set(employees.map(emp => emp.status))];
    res.status(200).json({ roles, statuses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching filter options" });
  }
};
