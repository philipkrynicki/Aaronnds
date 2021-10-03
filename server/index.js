const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const socket = require('socket.io');
const http = require('http')
const router = require('./router');
const passport = require("passport");
const keys = require('./config/keys')

// mongoose.connect("mongodb://localhost/aaronnds");

// DB Setup
mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
router(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// const server = app.listen(5000, () => {
//   console.log("Node.js listening on port " + 5000);
// })

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

const io = socket(server);
app.set('io', io);

io.on('connection', socket => {
  console.log('Socket connected: ', socket.id);
})