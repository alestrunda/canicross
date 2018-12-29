//load environment variables
require("dotenv").config();

//set-up
const express = require("express"),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors");

//allows access from outside
app.use(cors());

//use body parser to get parameters from requests
app.use(bodyParser.json());

//connect to db
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true },
  () => {
    console.log("Connection to database successfull");
  }
);

//get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//load routes
require("./routes.js")(app);

//start server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
