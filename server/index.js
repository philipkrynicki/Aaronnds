const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const socket = require('socket.io');
const AutoIncrementFactory = require('mongoose-sequence');

const List = require('./models/list');
const router = require('./router');
const passport = require("passport");

mongoose.connect('mongodb://localhost/aaronnds');
const connection = mongoose.createConnection("mongodb://localhost/aaronnds");
const AutoIncrement = AutoIncrementFactory(connection);

List.ListSchema.plugin(AutoIncrement, {id: 'position_seq', inc_field: 'position', reference_fields: ['board']});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
router(app);

const server = app.listen(5000, () => {
  console.log("Node.js listening on port " + 5000);
})

const io = socket(server);
app.set('io', io);

io.on('connection', socket => {
  console.log('Socket connected: ', socket.id);
})