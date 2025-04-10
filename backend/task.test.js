const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/taskapp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

it("should create a new task", async () => {
  jest.setTimeout(20000);

  const res = await request(app).post("/api/tasks").send({
    title: "Test Task",
    description: "Testing",
    status: "pending",
    dueDate: "2025-04-01T00:00:00Z",
  });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("title", "Test Task");
});

it("should fetch all tasks", async () => {
  const res = await request(app).get("/api/tasks");
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBeGreaterThan(0);
});

it("should return 404 if task not found", async () => {
  const res = await request(app).get("/api/tasks/123456789012345678901234");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error", "Task not found.");
});

it("should return 404 when deleting a non-existent task", async () => {
  const res = await request(app).delete("/api/tasks/123456789012345678901234");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error", "Task not found.");
});
