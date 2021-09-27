const express = require("express");
const mongoose = require("mongoose");
const router = require('./router');
const cors = require('cors');
const passport = require('passport');

mongoose.connect("mongodb://localhost/aaronnds");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
router(app);

app.listen(5000, () => {
  console.log("Node.js listening on port " + 5000);
})