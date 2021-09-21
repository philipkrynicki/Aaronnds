const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/aaronnds");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mainRoutes = require("./router");

app.use(mainRoutes);

app.listen(5000, () => {
  console.log("Node.js listening on port" + 5000);
})