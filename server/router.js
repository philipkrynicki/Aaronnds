const express = require("express");
const app = express();
const cors = require('cors');
const FakeData = require('./controllers/initial-data');
const Boards = require('./controllers/boards');
const Cards = require('./controllers/cards');

app.use(cors());

module.exports = function(app){
  app.get('/api/workspace/boards', Boards.getBoards);
  app.get('/api/boards/:board', Boards.getBoard);
  app.delete('/api/boards/:board', Boards.deleteBoard);
  app.put('/api/boards/:board', Boards.putBoard);
  app.get('/generate-initial-data', FakeData.generateFakeData);

  app.get('/api/lists/:list/cards', Cards.getCards);
};