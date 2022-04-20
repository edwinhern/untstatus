require("dotenv").config();

// Code Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/database");
const app = express();

// Routes for database
const users = require("./routes/users.js");
const contacts = require("./routes/contacts.js");

// port variable
const server_port = process.env.PORT;
const server_name = process.env.HOSTNAME || 'localhost';

// Connecting to Mongo database
mongoose.connect(config.database) // database is stores in the config file
  .then(() => { // On Connection - Checks for connection
    console.log("Connected to database: " + config.database);
  })
  .catch(() => { // Error Connection - Outputs error message to console if no connection
    console.log("Failed to connect to database: " + config.database);
  });


// Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", users);
app.use("/contacts", contacts);


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
    console.log(`Listening at http://${server_name}:${server_port}`);
  } else { // deployment status
    console.log("Server listening on port " + server_port);  
  }
});
