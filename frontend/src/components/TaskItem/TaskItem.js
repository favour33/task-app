import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onDelete, onToggle }) => {
  const handleDelete = () => onDelete(task._id);
  const handleToggle = () => onToggle(task);

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p className={`status ${task.status}`}>Status: {task.status}</p>

      <button className="toggle-status" onClick={handleToggle}>
        Mark as {task.status === "pending" ? "Completed" : "Pending"}
      </button>

      <button
        data-testid={`delete-task-${task._id}`}
        className="delete-task"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
