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
const server_port = process.env.HOST_PORT || 8080;

// Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", users);
app.use(session({ secret: process.env.SECRET || 'SECRET' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);


if(server_port == 8080) {
  app.use(express.static(path.join(__dirname + "/public/")));
  app.get("/*", (req, res) => {
    const fullPath = path.join(__dirname, "/public/index.html");
    console.log(" Fetching from.. " + fullPath);
    res.sendFile(fullPath);
  });
} else {
  // Set Static Folder
  app.use(express.static(path.join(__dirname + '/meanProject/dist/mean-project')));
  app.get('/*', (req, res) => {
    const fullPath = path.join(__dirname, '/meanProject/dist/mean-project/index.html');
    console.log(' Fetching from.. ' + fullPath);
    res.sendFile(fullPath);
  });
}


// Start Server
app.listen(server_port, () => {
  if(server_port == 8080) { // development status
    console.log(`Listening at http://${process.env.HOST_NAME}:${server_port}`);
  } else { // deployment status
    console.log("Server listening on port " + server_port);  
  }
});
