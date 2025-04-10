import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = { title, description, dueDate, status };

    addTask(taskData);

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("pending");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <input
        type="text"
        className="task-form-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className="task-form-textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="date"
        className="task-form-input"
        value={dueDate}
        placeholder="Due Date"
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select
        className="task-form-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button className="task-form-button" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
