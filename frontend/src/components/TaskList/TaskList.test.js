import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";

test("renders task list and interacts with tasks", () => {
  const tasks = [
    {
      _id: 1,
      title: "Test Task 1",
      description: "Description 1",
      dueDate: "2025-04-01T12:00",
      status: "pending",
    },
    {
      _id: 2,
      title: "Test Task 2",
      description: "Description 2",
      dueDate: "2025-04-02T12:00",
      status: "completed",
    },
  ];

  const handleDelete = jest.fn();
  const handleUpdate = jest.fn();

  render(
    <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleUpdate} />
  );

  // Check if tasks are displayed
  tasks.forEach((task) => {
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
  });

  // Use the unique test ID to find and click the delete button for the first task
  fireEvent.click(screen.getByTestId("delete-task-1"));

  // Ensure delete function is called
  expect(handleDelete).toHaveBeenCalledWith(1);
});
