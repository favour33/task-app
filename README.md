# Task Manager

A simple task management application built with React. This app allows users to create, view, and manage tasks efficiently.

## Features

- **Create Tasks**: Add tasks with title, description, due date, and status (pending/completed).
- **View Tasks**: Display a list of tasks.
- **Edit Tasks**: Modify task status.
- **Delete Tasks**: Remove tasks from the list.

## Tech Stack

- **Frontend**: React
- **Backend**: NodeJS, Express
- **State Management**: React Hooks
- **CSS**: Regular CSS
- **Testing**: Jest and React Testing Library

# Task API Documentation

Base URL: `http://localhost:5000/api/tasks`

## POST /api/tasks

Creates a new task.

### Body:

```json
{
  "title": "New Task",
  "description": "Details about the task",
  "dueDate": "2025-04-12T14:00",
  "status": "pending"
}
```

### Validation:

- **title**: (string, required)
- **status**: ("pending" or "completed")

### Responses:

- **201 Created** – Task created
- **400 Bad Request** – Missing or invalid fields

---

## GET /api/tasks

Fetches all tasks.

### Responses:

- **200 OK** – Array of tasks

---

## GET /api/tasks/:id

Returns a single task by its ID.

### Params:

- `:id` = MongoDB ObjectId

### Responses:

- **200 OK** – Task returned
- **404 Not Found** – No task with that ID
- **400 Bad Request** – Invalid ID

---

## PUT /api/tasks/:id

Updates a task by ID.

### Body:

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "dueDate": "2025-04-15T10:00",
  "status": "completed"
}
```

### Responses:

- **200 OK** – Updated task
- **404 Not Found** – No task with that ID
- **400 Bad Request** – Validation or ID issue

---

## DELETE /api/tasks/:id

Deletes a task by ID.

### Params:

- `:id` = MongoDB ObjectId

### Responses:

- **200 OK** – Task deleted
- **404 Not Found** – Task not found
- **400 Bad Request** – Invalid ID

---

## Error Format

All errors follow this structure:

```json
{
  "error": "Descriptive error message"
}
```

---

## Notes

- The `status` field can only be either `"pending"` or `"completed"`.
- All responses are in JSON format, and errors follow the provided error format.
