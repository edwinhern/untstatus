require("dotenv").config();

// Code Dependencies
const express = require("express");
const session = require('express-session');
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
const server_port = process.env.PORT || 8080;

// Set Static Folder
app.use(express.static(path.join(__dirname + 'meanProject/dist/mean-project')));

// Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", users);
app.use(session({ secret: 'SECRET' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

// // Index route
// app.get("/", (req, res) => {
//   res.send("Invalid endpoint!");
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'meanProject/dist/mean-project/index.html'));
});

// Start Server
app.listen(server_port, () => {
  console.log('Server listening on port ' + server_port);
});
