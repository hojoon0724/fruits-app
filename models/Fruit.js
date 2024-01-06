// -----------------------------------------------------
// Dependencies and connection
// -----------------------------------------------------
const mongoose = require("./connection");

const { Schema, model } = mongoose;

// schema = the shape of the data
const fruitSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  username: String,
});

// model - object for interacting with the database
const Fruit = model("Fruit", fruitSchema);

// -----------------------------------------------------
// Export the model
// -----------------------------------------------------
module.exports = Fruit;
