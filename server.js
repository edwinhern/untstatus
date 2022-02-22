require("dotenv").config();

// Code Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/database");

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database" + config.database);
});

// Error Connection
mongoose.connection.on("error", (err) => {
  console.log("Database error:" + err);
});

// initialize app variables with express()
const app = express();
const users = require("./routes/users.js");

// port variable
const port = process.env.HOST_PORT || 3000;

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/users", users);
// app.use(passport.initialize());
// app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

// Index route
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Start Server
app.listen(port, () => {
  console.log(`Listening at http://${process.env.HOST_NAME}:${port}`);
});
