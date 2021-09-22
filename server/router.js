const express = require("express");
const app = express();
const cors = require('cors');
const FakeData = require('./controllers/initial-data');
const Boards = require('./controllers/boards')
const Lists = require('./controllers/lists')

app.use(cors());

module.exports = function(app){
  app.get('/api/workspace/boards', Boards.getBoards);
  app.post('/api/workspace/boards', Boards.postBoard)
  app.get('/api/boards/:board', Boards.getBoard);
  app.delete('/api/boards/:board', Boards.deleteBoard);
  app.put('/api/boards/:board', Boards.putBoard);
  app.get('/api/boards/:board/lists', Lists.getLists)
  app.post('/api/boards/:board/lists', Lists.postList)

  app.get('/generate-initial-data', FakeData.generateFakeData);
};