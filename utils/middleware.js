// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
require("dotenv").config();
const express = require("express"); // web framework
const morgan = require("morgan"); // logger
const methodOverride = require("method-override"); // override forms

//*not used anymore because we moved the uses to different files
// const mongoose = require("mongoose"); // connect to our mongodb
// const Fruit = require("./models/Fruit");

const fruitController = require("../controllers/fruit");
const userController = require("../controllers/user");

// lets you store the sessions somewhere
const session = require("express-session");
const MongoStore = require("connect-mongo");

// -----------------------------------------------------
// Register Middleware
// -----------------------------------------------------
function registerGlobalMiddleware(app) {
  app.use(morgan("dev"));
  app.use(methodOverride("_method")); // override form submissions
  app.use(express.urlencoded({ extended: true })); // allows us to parse urlencoded bodies (forms are urlencoded)
  app.use(express.static("public")); // serves files from the public folder
  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );

  // Routes
  app.use("/fruits", fruitController);
  app.use("/user", userController);
}

module.exports = registerGlobalMiddleware;
