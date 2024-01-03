// -----------------------------------------------------
// Import dependencies
// -----------------------------------------------------

// Needs access to .env and get the configuration
require("dotenv").config();
const mongoose = require("mongoose");

// -----------------------------------------------------
// Establish connection
// -----------------------------------------------------
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

mongoose.connection.on("open", () => console.log("connected to mongoose"));
mongoose.connection.on("close", () => console.log("disconnected to mongoose"));
mongoose.connection.on("error", (error) => console.log("Error! " + error));

// -----------------------------------------------------
// Export connection - use in other files
// -----------------------------------------------------
// THIS version of mongoose is already connected. All other files are going to use THIS "mongoose"
module.exports = mongoose;
