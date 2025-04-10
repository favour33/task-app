import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm"; // Adjust import path if necessary

describe("TaskForm", () => {
  test("renders TaskForm and submits task", () => {
    // Mock the addTask function to track form submission
    const addTaskMock = jest.fn();

    // Render the TaskForm component with the mock function passed as a prop
    render(<TaskForm addTask={addTaskMock} />);

    // Check if the form fields are rendered correctly
    const titleInput = screen.getByPlaceholderText(/title/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const dueDateInput = screen.getByPlaceholderText(/due date/i);
    const statusSelect = screen.getByRole("combobox");
    const submitButton = screen.getByText(/add task/i);

    // Ensure the form inputs are rendered and can be interacted with
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(statusSelect).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "This is a test task description" },
    });
    fireEvent.change(dueDateInput, { target: { value: "2025-04-10" } });
    fireEvent.change(statusSelect, { target: { value: "pending" } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert that addTask was called with the correct data
    expect(addTaskMock).toHaveBeenCalledWith({
      title: "Test Task",
      description: "This is a test task description",
      dueDate: "2025-04-10",
      status: "pending",
    });

    // Optionally, you can check if the form fields are cleared after submission
    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
    expect(dueDateInput.value).toBe("");
    expect(statusSelect.value).toBe("pending");
  });
});
