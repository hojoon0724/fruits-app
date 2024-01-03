// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
require("dotenv").config();
const express = require("express"); // web framework
const morgan = require("morgan"); // logger
const methodOverride = require("method-override"); // override forms
const mongoose = require("mongoose"); // connect to our mongodb

// -----------------------------------------------------
// Database connection
// -----------------------------------------------------
const DATABASE_URL = process.env.DATABASE_URL; // "process" is what's going on in terminal, it just exists

// Establish connection
mongoose.connect(DATABASE_URL);

// Connection events that triggers depending on mongo's status
mongoose.connection
  .on("open", () => {
    console.log("connected to mongo");
  })
  .on("close", () => {
    console.log("disconnected from mongo");
  })
  .on("error", (error) => {
    console.log(error);
  });

// -----------------------------------------------------
// Application Object
// -----------------------------------------------------
const app = express();
const { PORT = 3013 } = process.env;

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------
app.use(morgan("dev"));
app.use(methodOverride("_method"));

// -----------------------------------------------------
// Routes INDUCESS
// -----------------------------------------------------
// Index

// New

// Delete

// Update

// Create

// Edit

// Seed

// Show

// -----------------------------------------------------
// GET requests
// -----------------------------------------------------
app.get("/", (req, res) => {
  res.send(`root response`);
});

// -----------------------------------------------------
// Listener
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
