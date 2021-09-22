const express = require("express");
const router = require("express").Router();
const app = express();
const cors = require('cors');
const FakeData = require('./controllers/initial-data');
const Boards = require('./controllers/boards')

//import models

app.use(cors());




module.exports = function(app){
  app.get('/generate-initial-data', FakeData.generateFakeData);
  app.get('/api/workspace/boards', Boards.getBoards);
  app.get('/api/boards/:board', Boards.getBoard)
};