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
const stripe = require("stripe")(process.env.stripe_key);

// port variable
const port = process.env.HOST_PORT || 8080;

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

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});

// Start Server
app.listen(port, () => {
  console.log(`Listening at http://${process.env.HOST_NAME}:${port}`);
});
