"use strict";

var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors");

var taskRoutes = require("./routes/taskRoutes");

var errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

var app = express();
var PORT = process.env.PORT || 5000;
var MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/taskapp";
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, function () {
    return console.log("\uD83D\uDE80 Server running on port ".concat(PORT));
  });
})["catch"](function (err) {
  console.error("❌ Error connecting to MongoDB", err);
});