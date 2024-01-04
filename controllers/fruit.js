// -----------------------------------------------------
// Independent routes for different categories
// -----------------------------------------------------

// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const Fruit = require("../models/Fruit"); // relative location - need to go up 2 folders

// -----------------------------------------------------
// Create the router
// -----------------------------------------------------
const router = express.Router();

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------
router.use((req, res, next) => {
  console.table(req.session);

  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

// -----------------------------------------------------
// Routes
// -----------------------------------------------------
router.get("/seed", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// Delete
router.delete("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.get("/:id/edit", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
// Export
// -----------------------------------------------------

module.exports = router;
