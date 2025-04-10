const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: "Title and due date are required." });
  }

  try {
    const task = new Task({ title, description, dueDate, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to save task to the database." });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks." });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: "Invalid task ID." });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: "Error updating task." });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: "Invalid task ID." });
  }
};
