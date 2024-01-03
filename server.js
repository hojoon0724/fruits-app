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
// Create Fruits Model
// -----------------------------------------------------
// Destructure Schema and model into their own variables
const { Schema, model } = mongoose;
// ^ same as
// const Schema = mongoose.Schema
// const model = mongoose.model

// schema = the shape of the data
const fruitSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// model - object for interacting with the database
const Fruit = model("Fruit", fruitSchema);

// -----------------------------------------------------
// Application Object
// -----------------------------------------------------
const app = express();
const { PORT = 3013 } = process.env;

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------
app.use(morgan("dev"));
app.use(methodOverride("_method")); // override form submissions
app.use(express.urlencoded({ extended: true })); // allows us to parse urlencoded bodies (forms are urlencoded)
app.use(express.static("public")); // serves files from the public folder

// -----------------------------------------------------
// Routes INDUCESS
// -----------------------------------------------------
// Seed -- puts some data for starter info - reset the data to continue testing
app.get("/fruits/seed", async (req, res) => {
  try {
    // array of all fruits
    const startFruits = [
      { name: "Orange", color: "orange", readyToEat: false },
      { name: "Grape", color: "purple", readyToEat: false },
      { name: "Banana", color: "orange", readyToEat: false },
      { name: "Strawberry", color: "red", readyToEat: false },
      { name: "Coconut", color: "brown", readyToEat: false },
    ];

    // delete all fruits
    await Fruit.deleteMany({});

    // seed my starter fruits
    const fruits = await Fruit.create(startFruits);

    // send fruits as response
    res.json(fruits);
  } catch (error) {
    console.log(error.message);
    res.send("there was an error yo");
  }
});

// Index
app.get("/fruits", async (req, res) => {
  try {
    // get all fruits
    const fruits = await Fruit.find({});
    // render a template
    // fruits/index.ejs = ./views/fruits/index.ejs
    res.render("fruits/index.ejs", { fruits });
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
});

// New
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// Delete
app.delete("/fruits/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Fruit.findByIdAndDelete(id);
    res.redirect("/fruits");
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Update
app.put("/fruits/:id", async (req, res) => {
  try {
    const id = req.params.id;
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    await Fruit.findByIdAndUpdate(id, req.body);
    res.redirect(`/fruits/${id}`);
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Create
app.post("/fruits", async (req, res) => {
  try {
    // check if readyToEat should be true
    // expression ? true : false (ternary operator)
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;

    // create the fruit in the database
    await Fruit.create(req.body);
    res.redirect("/fruits");
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Edit
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    //get the id from params
    const id = req.params.id;
    // get the fruit from the DB
    const fruit = await Fruit.findById(id);
    // render the template
    res.render("fruits/edit.ejs", { fruit });
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Show - get to /fruits/:id
// ALWAYS PUT THE SHOW ROUTE AT THE END
// Otherwise "/new" could be taken as an ID
app.get("/fruits/:id", async (req, res) => {
  try {
    // get the id from params
    const id = req.params.id;

    // find the fruit from the DB
    const fruit = await Fruit.findById(id);

    // render the template with the fruit
    res.render("fruits/show.ejs", { fruit });
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

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
