"use strict";

var request = require("supertest");

var mongoose = require("mongoose");

var app = require("./app");

beforeAll(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/taskapp", {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
afterAll(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(mongoose.connection.close());

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
it("should create a new task", function _callee3() {
  var res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          jest.setTimeout(20000);
          _context3.next = 3;
          return regeneratorRuntime.awrap(request(app).post("/api/tasks").send({
            title: "Test Task",
            description: "Testing",
            status: "pending",
            dueDate: "2025-04-01T00:00:00Z"
          }));

        case 3:
          res = _context3.sent;
          expect(res.statusCode).toBe(201);
          expect(res.body).toHaveProperty("title", "Test Task");

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
it("should fetch all tasks", function _callee4() {
  var res;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(request(app).get("/api/tasks"));

        case 2:
          res = _context4.sent;
          expect(res.statusCode).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBeGreaterThan(0);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
it("should return 404 if task not found", function _callee5() {
  var res;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(request(app).get("/api/tasks/123456789012345678901234"));

        case 2:
          res = _context5.sent;
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("error", "Task not found.");

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
it("should return 404 when deleting a non-existent task", function _callee6() {
  var res;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(request(app)["delete"]("/api/tasks/123456789012345678901234"));

        case 2:
          res = _context6.sent;
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("error", "Task not found.");

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});