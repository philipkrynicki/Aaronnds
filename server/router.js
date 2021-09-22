const express = require("express");
const app = express();
const cors = require('cors');
const Boards = require('./controllers/boards')
//import models

app.use(cors());



module.exports = function(app){
  app.get('/api/workspace/boards', Boards.getBoards);
  app.get('/api/boards/:board', Boards.getBoard);
  app.delete('/api/boards/:board', Boards.deleteBoard);
  app.put('/api/boards/:board', Boards.putBoard);
};