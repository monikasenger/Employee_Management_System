

import Task from "../models/TaskModel.js";

//get all task 
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};


//create task
export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Failed to create task" });
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to update task" });
  }
};

//delete task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

//get task by filter
export const getTaskFilterOptions = async (req, res) => {
  try {
    const tasks = await Task.find({}, "status priority"); 

   
    const statuses = [...new Set(tasks.map(task => task.status))];
    const priorities = [...new Set(tasks.map(task => task.priority))];

    res.status(200).json({ statuses, priorities });
  } catch (error) {
    console.error("Error fetching task filter options:", error);
    res.status(500).json({ message: "Error fetching task filter options" });
  }
};