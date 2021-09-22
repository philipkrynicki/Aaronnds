const express = require("express");
const mongoose = require("mongoose");
const router = require('./router');

mongoose.connect("mongodb://localhost/aaronnds");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router(app);

app.listen(5000, () => {
  console.log("Node.js listening on port" + 5000);
})